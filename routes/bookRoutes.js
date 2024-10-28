import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();
// Route to save a book
router.post("/", async (req, res) => {
  try {
    // Ensure all required fields are present
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "All fields are required: title, author, and publishYear",
      });
    }

    // Create a new book
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const book = await Book.create(newBook);

    // Respond with the created book
    return res.status(201).send(book);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});
// Route for Get All Books from Database
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({}); // Fixed typo: 'awaitBook' to 'await Book'

    return res.status(200).json({
      count: books.length,
      data: books,
    }); // Fixed 'response' to 'res'
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});
// Route for Get One Books from Database by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    return res.status(200).json(book); // Fixed 'response' to 'res'
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});
//Route for updating Database
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "All fields are required: title, author, and publishYear",
      });
    }
    const { id } = req.params;

    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).send({ message: "Book Updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});
//Route for deleting a book
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
