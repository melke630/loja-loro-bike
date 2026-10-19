/*
import { Router } from "express";
import { createReview, getReviewsByProduct } from "../controllers/reviewController.js";
import auth from "../middleware/auth.js";

const reviewRouter = Router();

// Cliente logado cria / edita avaliação
reviewRouter.post("/create", auth, createReview);

// Qualquer visitante pode ver as avaliações do produto
reviewRouter.get("/product/:productId", getReviewsByProduct);

export default reviewRouter; */
/*
import { Router } from "express";
import { createReview, getReviewsByProduct, updateReview, deleteReview } from "../controllers/reviewController.js";
import auth from "../middleware/auth.js";
const reviewRouter = Router();
reviewRouter.post("/create", auth, createReview);
reviewRouter.get("/product/:productId", getReviewsByProduct);
reviewRouter.put("/:id", auth, updateReview);
reviewRouter.delete("/:id", auth, deleteReview);
export default reviewRouter; */

import { Router } from "express";
import { createReview, getReviewsByProduct, updateReview, deleteReview, toggleHelpful } from "../controllers/reviewController.js";
import auth from "../middleware/auth.js";
const reviewRouter = Router();
reviewRouter.post("/create", auth, createReview);
reviewRouter.get("/product/:productId", getReviewsByProduct);
reviewRouter.put("/:id", auth, updateReview);
reviewRouter.delete("/:id", auth, deleteReview);
reviewRouter.post("/:id/helpful", auth, toggleHelpful);
export default reviewRouter;