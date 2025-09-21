import express from "express";
import notificationController from "../controllers/notification.controller";
const notificationRouter = express.Router();

notificationRouter.post('', notificationController.send);

export default notificationRouter;
