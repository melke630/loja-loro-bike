import { Router } from "express";
import auth from "../middleware/auth.js";
import { addAddressController } from "../controllers/address.controller.js";

const addressRouter = Router();

// Rota POST para criar o endereço (exige que o usuário esteja logado com o 'auth')
addressRouter.post("/create", auth, addAddressController);

export default addressRouter;