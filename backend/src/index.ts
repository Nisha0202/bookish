import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import bookRoutes from "./routes/bookRoutes";
import borrowRoutes from "./routes/borrowRoutes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/books", bookRoutes);
app.use("/borrows", borrowRoutes);

const PORT = process.env.PORT || 5000;

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.5cua0xk.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority&appName=Cluster0`;

const MONGO_URI = uri || 'mongodb://localhost:27017/library';

mongoose.connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));