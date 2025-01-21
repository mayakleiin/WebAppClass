import request from "supertest";
import initApp from "../server";
import mongoose from "mongoose";
import { Express } from "express";

let app: Express;

beforeAll(async () => {
  console.log("init app");
  app = await initApp();
  console.log("init app finished");
  console.log("delete all posts");
});

afterAll(async () => {
  await mongoose.connection.close();
});

let commentId = "";

const testComment1 = {
  owner: "Eliav",
  comment: "My First post",
  postId: "This is my first post",
};

const testComment2 = {
  owner: "Eliav2",
  comment: "My First post 2",
  postId: "This is my first post 2",
};

const testCommentFail = {
  comment: "My First post 2",
  postId: "This is my first post 2",
};

describe("Comments Tests", () => {
  test("Comments Get All coimments", async () => {
    const response = await request(app).get("/comments");
    console.log(response.body);
    expect(response.statusCode).toBe(200);
  });

  test("Comment Create test", async () => {
    const response = await request(app).post("/comments").send(testComment1);
    console.log(response.body);
    const comment = response.body;
    expect(response.statusCode).toBe(201);
    expect(comment.owner).toBe(testComment1.owner);
    expect(comment.comment).toBe(testComment1.comment);
    expect(comment.postId).toBe(testComment1.postId);
    commentId = comment._id;
  });
});
