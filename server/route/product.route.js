import { Router } from "express";
import auth from "../middleware/auth.js";
import { 
    createProductController, 
    getProductByCategory, 
    getProductByCategoryAndSubCategory, 
    getProductController, 
    getProductDetails,
    updateProductDetails,   
    deleteProductDetails,
    searchProduct // 1. Importe a função de busca aqui
} from "../controllers/product.controller.js";

const productRouter = Router();

productRouter.post("/create", auth, createProductController);
productRouter.post("/get", getProductController);
productRouter.post("/get-product-by-category", getProductByCategory);
productRouter.post("/get-product-by-category-and-subcategory", getProductByCategoryAndSubCategory);
productRouter.post("/get-product-details", getProductDetails);

// 2. Adicione a rota de busca aqui:
productRouter.post("/search-product", searchProduct);
// Adicione a rota de atualização aqui:
productRouter.put("/update-product", auth, updateProductDetails);

// Opcional (se for usar deletar produto depois):
//productRouter.delete("/delete", auth, deleteProductDetails);

export default productRouter;