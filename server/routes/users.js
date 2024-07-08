import express from "express";

import {createUser} from "../controllers/userControllers.js";

const usersRouter = express.Router();

usersRouter.post("/signup", createUser);

export default usersRouter;