import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import CartProductModel from "./models/cartproduct.model.js";
import ProductModel from "./models/product.model.js";

await mongoose.connect(process.env.MONGODB_URI);

const cart = await CartProductModel.findOne().populate("productId");
console.log("COM POPULATE:", cart);

await mongoose.disconnect();