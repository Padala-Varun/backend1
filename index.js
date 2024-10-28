import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
const app = express();
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/bookRoutes.js";
import cors from "cors";
// Middleware to parse JSON request bodies
app.use(express.json());
//Middleware for handling CORS policy
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"], // Allow all origins
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);
app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome");
});

app.use("/books", booksRoute);

mongoose
  .connect(mongoDBURL, {
    ssl: true, // Ensure SSL is enabled if required
  })
  .then(() => {
    console.log("Connected to MongoDB!");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
