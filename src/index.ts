import express from 'express';
import cors from "cors";
import * as bodyParser from "body-parser";
import {dbMiddleware} from "../../p01_database_lib";

import notificationRouter from "./routes/notification.router";

const port = process.env.PORT || 3000;

const app = express();
// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(dbMiddleware({
  host: 'localhost',
  database: 'marketing_request_db',
  port: 3306,
  username: 'marketing_user',
  password: 'MarketingApp25@',
  dialect: "mysql",
  timezone: "-05:00",
}));

// Paths
const BASE_PATH = '/api/v1/notification';

app.use(BASE_PATH, notificationRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});