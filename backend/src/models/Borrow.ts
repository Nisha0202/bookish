import mongoose, { Document, Schema } from "mongoose";
import { IBook } from "./Book";

//interface 
export interface IBorrow extends Document {
  book: IBook["_id"];      // Reference to a Book document
  quantity: number;        // Number of copies borrowed
  dueDate: Date;          
}

//the schema
const borrowSchema = new Schema<IBorrow>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    dueDate: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true // Automatically manages createdAt and updatedAt
  }
);

// Export model
export default mongoose.model<IBorrow>("Borrow", borrowSchema);
