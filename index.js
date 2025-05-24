//1. imports
import express from "express";
import urlRouter from "./routes/url.js";
import { connectMongoDb } from "./connection.js";
import testRouter from "./routes/test.js";
import path from "path";
import staticRoute from "./routes/staticRouter.js";

// 2. Create App
const app = express();
const port = 8001;

// 3. Connection with DB
connectMongoDb("mongodb://localhost:27017/short-url")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Mongo Error", err));

//4. MiddleWares
app.set("view engine", "ejs"); //Need to tell server w hich engine using for SSR.
app.set("views", path.resolve("./views")); //Need to tell Server where views files are there.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//5. Routes
app.use("/url", urlRouter);
app.use("/test", testRouter);
app.use("/", staticRoute);

//6. Add Port Listener
app.listen(port, () => console.log(`Server Started at Port ${port}`));
