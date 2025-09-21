import express from 'express';
import cors from "cors";
import * as bodyParser from "body-parser";
import {dbMiddleware} from "marketing-request-database-lib";

import notificationRouter from "./routes/notification.router";
import {mailMiddleware} from "./middlewares/mail.middleware";

const port = process.env.PORT || 3001;

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
app.use(mailMiddleware());

// Paths
const BASE_PATH = '/api/v1/notification';

app.use(BASE_PATH, notificationRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});