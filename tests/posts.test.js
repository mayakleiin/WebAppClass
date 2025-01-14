const request = require("supertest");
const initApp = require("../server");
const mongoose = require("mongoose");
const postModel = require("../models/posts_model");

const testPosts = require("./test_posts");

let app;
beforeAll(async () => {
    console.log("Before all tests");
    app = await initApp();
    await postModel.deleteMany();
});

afterAll(() => {
    console.log("After all tests");
    mongoose.connection.close();
});

describe("Posts Test", () => {
    
    test("Test get all posts empty", async () => {
        const response = await request(app).get("/posts");
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(0);
    });

    test("Test create new post", async () => {
        for(let post of testPosts){
            const response = await request(app).post("/posts").send(post);
            expect(response.statusCode).toBe(201);
            expect(response.body.title).toBe(post.title);
            expect(response.body.content).toBe(post.content);
            expect(response.body.owner).toBe(post.owner);
            post._id = response.body._id;
        }
    });

    test("Test get all posts", async () => {
        const response = await request(app).get("/posts");
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(testPosts.length);
    }); 

    test("Test get post by id", async () => {
        const response = await request(app).get("/posts/" + testPosts[0]._id);
        expect(response.statusCode).toBe(200);
        expect(response.body._id).toBe(testPosts[0]._id);
    });

    test("Test filter post by owner", async () => {
        const response = await request(app).get("/posts?owner=" + testPosts[0].owner);
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);
    });

    test("Test delete post", async () => {
        const response = await request(app).delete("/posts/" + testPosts[0]._id);
        expect(response.statusCode).toBe(200);

        const responseGet = await request(app).get("/posts/" + testPosts[0]._id);
        expect(responseGet.statusCode).toBe(404);
    });

    test("Test create new fail", async () => {
        const response = await request(app).post("/posts").send({title: "Test Post", content: "Test Content"});
        expect(response.statusCode).toBe(400);
    });

});
