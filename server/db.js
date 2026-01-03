import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoDBURI = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoDBURI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("mongodb connection failed", error.message);
    process.exit(1);
  }
};

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  message: {
    type: String,
    required: false,
  },
});

const Contact = mongoose.model("Contact", contactSchema);

export { connectDB, Contact };
