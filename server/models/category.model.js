import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    /*image: {
      type: String,
      required: true,
    },*/
    image: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true, // cria automaticamente createdAt e updatedAt
  }
);

const CategoryModel = mongoose.model("Category", categorySchema);

export default CategoryModel;