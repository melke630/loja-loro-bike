/*

import { Router } from 'express';
import { 
    addBannerController, 
    getActiveBannersController, 
    deleteBannerController 
} from '../controllers/banner.controller.js';
import auth from '../middleware/auth.js'; // Seu middleware de autenticação de admin

const bannerRouter = Router();

bannerRouter.post('/add-banner', auth, addBannerController);
bannerRouter.get('/get-banners', getActiveBannersController);
bannerRouter.delete('/delete-banner/:id', auth, deleteBannerController);

export default bannerRouter; */
//novo codigo banner
/*
import { Router } from "express";
import auth from "../middleware/auth.js";
import { admin } from "../middleware/Admin.js";
import { 
    addBannerController, 
    getBannersController, 
    deleteBannerController 
} from "../controllers/banner.controller.js";

const bannerRouter = Router();

bannerRouter.post("/add", auth, admin, addBannerController);
bannerRouter.get("/get", getBannersController);
bannerRouter.delete("/delete/:id", auth, admin, deleteBannerController); // ID enviado via parâmetro na URL

export default bannerRouter; */
// codigp do gemini será que funciona?
/*
import { Router } from 'express';
import auth from '../middleware/auth.js'; // Sem chaves (se o auth for default) ou com chaves se for export const
import admin from '../middleware/Admin.js'; // SEM CHAVES, pois usamos export default admin
import { AddBannerController, DeleteBannerController, GetBannerController } from '../controllers/banner.controller.js';

const bannerRouter = Router();

bannerRouter.post("/add", auth, admin, AddBannerController);
bannerRouter.get("/get", GetBannerController);
bannerRouter.delete("/delete", auth, admin, DeleteBannerController);

export default bannerRouter; */
/*
import { Router } from 'express';
import auth from '../middleware/auth.js';
import { 
    AddBannerController, 
    GetBannerController, 
    DeleteBannerController 
} from '../controllers/banner.controller.js';

const bannerRouter = Router();

bannerRouter.post("/add", auth, AddBannerController);
bannerRouter.post("/get", GetBannerController); // Ou .get se preferir, mas o post garante compatibilidade
bannerRouter.post("/delete", auth, DeleteBannerController); // Seguindo o padrão de subCategory

export default bannerRouter; */

import { Router } from "express";
import auth from "../middleware/auth.js";
import { 
    AddBannerController, 
    GetBannerController, 
    DeleteBannerController 
} from "../controllers/banner.controller.js";

const bannerRouter = Router();

bannerRouter.post("/add", auth, AddBannerController);

// Aceita tanto GET quanto POST para buscar (evita qualquer 404 no carregamento)
bannerRouter.get("/get", GetBannerController);
bannerRouter.post("/get", GetBannerController);

// Aceita tanto requisições simples quanto com ID na URL, usando o método DELETE do seu SummaryApi
bannerRouter.delete("/delete", auth, DeleteBannerController);
bannerRouter.delete("/delete/:id", auth, DeleteBannerController);

export default bannerRouter;