import { Router } from "express";
import auth from "../middleware/auth.js";
import { 
    cashOnDeliveryOrderController, 
    getOrderController // 👈 1. Importe o novo controller
} from "../controllers/order.controller.js";

const orderRouter = Router();

// Rota para criar o pedido
orderRouter.post("/create-order", auth, cashOnDeliveryOrderController);

// 👈 2. Adicione a rota para listar os pedidos do usuário logado
orderRouter.get("/get-order", auth, getOrderController);

export default orderRouter;