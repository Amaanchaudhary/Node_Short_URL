//1. imports
import express from "express";
import urlRouter from "./routes/url.js";
import { connectMongoDb } from "./connection.js";

// 2. Create App
const app = express();
const port = 8001;

// 3. Connection with DB
connectMongoDb("mongodb://localhost:27017/short-url")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Mongo Error", err));

//4. MiddleWares
app.use(express.json());


//5. Routes
app.use("/url", urlRouter);


//6. Add Port Listener
app.listen(port, () => console.log(`Server Started at Port ${port}`));
