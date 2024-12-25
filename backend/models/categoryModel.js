import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxLength: 32,
  },
});

export default mongoose.model("Category", categorySchema);
