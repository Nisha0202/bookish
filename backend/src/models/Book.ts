import mongoose, { Document, Schema } from "mongoose";

// Interface
export interface IBook extends Document {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
}

//the schema 
const bookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    genre: {
      type: String,
      required: true
    },
    isbn: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String
    },
    copies: {
      type: Number,
      required: true
    },
    available: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true // Automatically adds createdAt and updatedAt
  }
);

// Before saving, update the availability based on number of copies
bookSchema.pre("save", function (next) {
  this.available = this.copies > 0;
  next();
});

bookSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate() as any;
  if (update.copies !== undefined) {
    update.available = update.copies > 0;
  }
  next();
});

// Export model
export default mongoose.model<IBook>("Book", bookSchema);
