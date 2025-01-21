import request from "supertest";
import initApp from "../server";
import mongoose from "mongoose";
import postsModel from "../models/posts_model";
import { Express } from "express";
import userModel from "../models/user_model";

let app: Express;

type UserInfo = {
  email: string;
  password: string;
  token?: string;
  _id?: string;
};
const userInfo: UserInfo = {
  email: "mayaK@gmail.com",
  password: "123456",
};

beforeAll(async () => {
  app = await initApp();
  await postsModel.deleteMany();
  await userModel.deleteMany();
  await request(app).post("/auth/register").send(userInfo);
  const response = await request(app).post("/auth/login").send(userInfo);
  userInfo.token = response.body.token;
  userInfo._id = response.body._id;
});

afterAll(async () => {
  await mongoose.connection.close();
});

var postId = "";

const testPost1 = {
  owner: "Maya",
  title: "My First post",
  content: "This is my first post",
};

const testPost2 = {
  owner: "Maya2",
  title: "My First post 2",
  content: "This is my first post 2",
};

const testPostFail = {
  content: "This is my first post 2",
};

describe("Posts Tests", () => {
  test("Posts Get All test", async () => {
    const response = await request(app).get("/posts");
    console.log(response.body);
    expect(response.statusCode).toBe(200);
  });

  test("Posts Create test", async () => {
    const response = await request(app)
      .post("/posts")
      .set("Authorization", "JWT " + userInfo.token)
      .send(testPost1);
    console.log(response.body);
    const post = response.body;
    expect(response.statusCode).toBe(201);
    expect(post.owner).toBe(userInfo._id);
    expect(post.title).toBe(testPost1.title);
    expect(post.content).toBe(testPost1.content);
    postId = post._id;
  });

  test("Posts Get By Id test", async () => {
    const response = await request(app).get("/posts/" + postId);
    const post = response.body;
    console.log("/posts/" + postId);
    console.log(post);
    expect(response.statusCode).toBe(200);
    expect(response.body._id).toBe(post._id);
  });

  test("Posts Get By Id test fail", async () => {
    const response = await request(app).get("/posts/" + postId + "3");
    expect(response.statusCode).toBe(400);
  });

  test("Posts Create test", async () => {
    const response = await request(app)
      .post("/posts")
      .set("Authorization", "JWT " + userInfo.token)
      .send(testPost2);
    console.log(response.body);
    const post = response.body;
    expect(response.statusCode).toBe(201);
    expect(post.owner).toBe(userInfo._id);
    expect(post.title).toBe(testPost2.title);
    expect(post.content).toBe(testPost2.content);
    postId = post._id;
  });

  test("Posts Create test fail", async () => {
    const response = await request(app).post("/posts").send(testPostFail);
    expect(response.statusCode).not.toBe(201);
  });

  test("Posts get posts by owner", async () => {
    const response = await request(app).get("/posts?owner=" + userInfo._id);
    const post = response.body[0];
    expect(response.statusCode).toBe(200);
    expect(post.owner).toBe(userInfo._id);
    expect(response.body.length).toBe(2);
  });

  test("Posts Delete test", async () => {
    const response = await request(app)
      .delete("/posts/" + postId)
      .set("Authorization", "JWT " + userInfo.token);
    expect(response.statusCode).toBe(200);

    const response2 = await request(app).get("/posts/" + postId);
    expect(response2.statusCode).toBe(404);

    const response3 = await request(app).get("/posts/" + postId);
    const post = response3.body;
    console.log(post);
    expect(response3.statusCode).toBe(404);
  });
});
