import postsModel from "../models/posts_model";
import BaseController from "./base_controller";

const postController = new BaseController(postsModel);

export default postController;