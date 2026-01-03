import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB, Contact } from "./db.js";
import validateEmail from "./validateMiddleware.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

connectDB();

app.get("/get", async (req, res) => {
  console.log("GET /get called");
  const contacts = await Contact.find();
  res.json(contacts);
});

app.post("/submit", validateEmail, async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({
      message: "Name, email and phone are required",
    });
  }
  try {
    await Contact.create({
      name,
      email,
      phone,
      message,
    });

    res.status(201).json({
      message: "Contact registered successfully",
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Email or phone already exists",
      });
    }
    res.status(500).json({ message: error.message });
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
