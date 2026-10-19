/*
import ReviewModel from "../models/reviewModel.js";

export const createReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;
    const userId = req.userId;

    if (!productId || !rating || !comment) {
      return res.status(400).json({ message: "Preencha todos os campos", success: false });
    }

    // Se o cliente já avaliou, atualiza a avaliação dele
    const existing = await ReviewModel.findOne({ productId, userId });
    if (existing) {
      existing.rating = rating;
      existing.comment = comment;
      await existing.save();
      return res.json({ message: "Avaliação atualizada!", success: true, data: existing });
    }

    const review = new ReviewModel({ productId, userId, rating, comment });
    await review.save();

    return res.json({ message: "Obrigado pela avaliação!", success: true, data: review });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const getReviewsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await ReviewModel.find({ productId })
      .populate("userId", "name")
      .sort({ createdAt: -1 });

    const average = reviews.length > 0
      ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
      : 0;

    return res.json({ message: "Avaliações", success: true, data: reviews, average });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
}; */
/*
import ReviewModel from "../models/reviewModel.js";
import UserModel from "../models/userModel.js";

export const createReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;
    const userId = req.userId;
    if (!productId || !rating || !comment) return res.status(400).json({ message: "Preencha todos os campos", success: false });
    const existing = await ReviewModel.findOne({ productId, userId });
    if (existing) { existing.rating = rating; existing.comment = comment; await existing.save(); return res.json({ message: "Avaliação atualizada!", success: true, data: existing }); }
    const review = new ReviewModel({ productId, userId, rating, comment });
    await review.save();
    return res.json({ message: "Obrigado pela avaliação!", success: true, data: review });
  } catch (error) { return res.status(500).json({ message: error.message, success: false }); }
};

export const getReviewsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await ReviewModel.find({ productId }).sort({ createdAt: -1 }).lean();
    const reviewsWithUser = await Promise.all(reviews.map(async (r) => {
      const user = await UserModel.findById(r.userId).select("name avatar").lean();
      return { ...r, userId: { _id: r.userId, name: user?.name || "Cliente", avatar: user?.avatar || "" } };
    }));
    const average = reviews.length > 0 ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length : 0;
    return res.json({ message: "Avaliações", success: true, data: reviewsWithUser, average });
  } catch (error) { return res.status(500).json({ message: error.message, success: false }); }
};

export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;
    const review = await ReviewModel.findById(id);
    if (!review) return res.status(404).json({ message: "Avaliação não encontrada", success: false });
    const user = await UserModel.findById(req.userId);
    const isOwner = review.userId.toString() === req.userId.toString();
    const isAdmin = user?.role === "ADMIN";
    if (!isOwner && !isAdmin) return res.status(403).json({ message: "Sem permissão", success: false });
    review.rating = rating; review.comment = comment; await review.save();
    return res.json({ message: "Avaliação editada!", success: true, data: review });
  } catch (error) { return res.status(500).json({ message: error.message, success: false }); }
};

export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await ReviewModel.findById(id);
    if (!review) return res.status(404).json({ message: "Avaliação não encontrada", success: false });
    const user = await UserModel.findById(req.userId);
    const isOwner = review.userId.toString() === req.userId.toString();
    const isAdmin = user?.role === "ADMIN";
    if (!isOwner && !isAdmin) return res.status(403).json({ message: "Sem permissão", success: false });
    await ReviewModel.findByIdAndDelete(id);
    return res.json({ message: "Avaliação excluída!", success: true });
  } catch (error) { return res.status(500).json({ message: error.message, success: false }); }
}; */

/*
import ReviewModel from "../models/reviewModel.js";
import mongoose from "mongoose";

export const createReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;
    const userId = req.userId;
    if (!productId || !rating || !comment) return res.status(400).json({ message: "Preencha todos os campos", success: false });
    const existing = await ReviewModel.findOne({ productId, userId });
    if (existing) { existing.rating = rating; existing.comment = comment; await existing.save(); return res.json({ message: "Avaliação atualizada!", success: true, data: existing }); }
    const review = new ReviewModel({ productId, userId, rating, comment });
    await review.save();
    return res.json({ message: "Obrigado pela avaliação!", success: true, data: review });
  } catch (error) { console.log("CREATE REVIEW ERROR:", error); return res.status(500).json({ message: error.message, success: false }); }
};

export const getReviewsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await ReviewModel.find({ productId })
      .populate("userId", "name avatar")
      .sort({ createdAt: -1 });
    const average = reviews.length > 0 ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length : 0;
    return res.json({ message: "Avaliações", success: true, data: reviews, average });
  } catch (error) {
    console.log("GET REVIEW ERROR:", error);
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;
    const review = await ReviewModel.findById(id);
    if (!review) return res.status(404).json({ message: "Avaliação não encontrada", success: false });
    
    // Pega o modelo User já registrado, sem importar arquivo
    const User = mongoose.model("User");
    const user = await User.findById(req.userId);
    const isOwner = review.userId.toString() === req.userId.toString();
    const isAdmin = user?.role === "ADMIN";
    if (!isOwner && !isAdmin) return res.status(403).json({ message: "Sem permissão", success: false });
    review.rating = rating; review.comment = comment; await review.save();
    return res.json({ message: "Avaliação editada!", success: true, data: review });
  } catch (error) { console.log("UPDATE ERROR:", error); return res.status(500).json({ message: error.message, success: false }); }
};

export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await ReviewModel.findById(id);
    if (!review) return res.status(404).json({ message: "Avaliação não encontrada", success: false });
    
    const User = mongoose.model("User");
    const user = await User.findById(req.userId);
    const isOwner = review.userId.toString() === req.userId.toString();
    const isAdmin = user?.role === "ADMIN";
    if (!isOwner && !isAdmin) return res.status(403).json({ message: "Sem permissão", success: false });
    await ReviewModel.findByIdAndDelete(id);
    return res.json({ message: "Avaliação excluída!", success: true });
  } catch (error) { console.log("DELETE ERROR:", error); return res.status(500).json({ message: error.message, success: false }); }
}; */
/*
import ReviewModel from "../models/reviewModel.js";
import mongoose from "mongoose";

export const createReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;
    const userId = req.userId;
    if (!productId || !rating || !comment) return res.status(400).json({ message: "Preencha todos os campos", success: false });
    const existing = await ReviewModel.findOne({ productId, userId });
    if (existing) { existing.rating = rating; existing.comment = comment; await existing.save(); return res.json({ message: "Avaliação atualizada!", success: true, data: existing }); }
    const review = new ReviewModel({ productId, userId, rating, comment });
    await review.save();
    return res.json({ message: "Obrigado pela avaliação!", success: true, data: review });
  } catch (error) { console.log("CREATE REVIEW ERROR:", error); return res.status(500).json({ message: error.message, success: false }); }
};

export const getReviewsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await ReviewModel.find({ productId }).populate("userId", "name avatar").sort({ createdAt: -1 });
    const average = reviews.length > 0 ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length : 0;
    return res.json({ message: "Avaliações", success: true, data: reviews, average });
  } catch (error) { console.log("GET REVIEW ERROR:", error); return res.status(500).json({ message: error.message, success: false }); }
};

export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;
    const review = await ReviewModel.findById(id);
    if (!review) return res.status(404).json({ message: "Avaliação não encontrada", success: false });
    const User = mongoose.model("User");
    const user = await User.findById(req.userId);
    const isOwner = review.userId.toString() === req.userId.toString();
    const isAdmin = user?.role === "ADMIN";
    if (!isOwner && !isAdmin) return res.status(403).json({ message: "Sem permissão", success: false });
    review.rating = rating; review.comment = comment; await review.save();
    return res.json({ message: "Avaliação editada!", success: true, data: review });
  } catch (error) { console.log("UPDATE ERROR:", error); return res.status(500).json({ message: error.message, success: false }); }
};

export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await ReviewModel.findById(id);
    if (!review) return res.status(404).json({ message: "Avaliação não encontrada", success: false });
    const User = mongoose.model("User");
    const user = await User.findById(req.userId);
    const isOwner = review.userId.toString() === req.userId.toString();
    const isAdmin = user?.role === "ADMIN";
    if (!isOwner && !isAdmin) return res.status(403).json({ message: "Sem permissão", success: false });
    await ReviewModel.findByIdAndDelete(id);
    return res.json({ message: "Avaliação excluída!", success: true });
  } catch (error) { console.log("DELETE ERROR:", error); return res.status(500).json({ message: error.message, success: false }); }
}; */
import ReviewModel from "../models/reviewModel.js";
import mongoose from "mongoose";

export const createReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;
    const userId = req.userId;
    if (!productId || !rating || !comment) return res.status(400).json({ message: "Preencha todos os campos", success: false });
    const existing = await ReviewModel.findOne({ productId, userId });
    if (existing) { existing.rating = rating; existing.comment = comment; await existing.save(); return res.json({ message: "Avaliação atualizada!", success: true, data: existing }); }
    const review = new ReviewModel({ productId, userId, rating, comment });
    await review.save();
    return res.json({ message: "Obrigado pela avaliação!", success: true, data: review });
  } catch (error) { console.log("CREATE REVIEW ERROR:", error); return res.status(500).json({ message: error.message, success: false }); }
};

export const getReviewsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await ReviewModel.find({ productId }).populate("userId", "name avatar").sort({ createdAt: -1 });
    const average = reviews.length > 0 ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length : 0;
    return res.json({ message: "Avaliações", success: true, data: reviews, average });
  } catch (error) { console.log("GET REVIEW ERROR:", error); return res.status(500).json({ message: error.message, success: false }); }
};

export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;
    const review = await ReviewModel.findById(id);
    if (!review) return res.status(404).json({ message: "Avaliação não encontrada", success: false });
    const User = mongoose.model("User");
    const user = await User.findById(req.userId);
    const isOwner = review.userId.toString() === req.userId.toString();
    const isAdmin = user?.role === "ADMIN";
    if (!isOwner && !isAdmin) return res.status(403).json({ message: "Sem permissão", success: false });
    review.rating = rating; review.comment = comment; await review.save();
    return res.json({ message: "Avaliação editada!", success: true, data: review });
  } catch (error) { console.log("UPDATE ERROR:", error); return res.status(500).json({ message: error.message, success: false }); }
};

export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await ReviewModel.findById(id);
    if (!review) return res.status(404).json({ message: "Avaliação não encontrada", success: false });
    const User = mongoose.model("User");
    const user = await User.findById(req.userId);
    const isOwner = review.userId.toString() === req.userId.toString();
    const isAdmin = user?.role === "ADMIN";
    if (!isOwner && !isAdmin) return res.status(403).json({ message: "Sem permissão", success: false });
    await ReviewModel.findByIdAndDelete(id);
    return res.json({ message: "Avaliação excluída!", success: true });
  } catch (error) { console.log("DELETE ERROR:", error); return res.status(500).json({ message: error.message, success: false }); }
};

// NOVO - Foi útil?
export const toggleHelpful = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const review = await ReviewModel.findById(id);
    if (!review) return res.status(404).json({ message: "Avaliação não encontrada", success: false });

    const already = review.helpfulBy.some(u => u.toString() === userId.toString());
    if (already) {
      review.helpfulBy = review.helpfulBy.filter(u => u.toString() !== userId.toString());
      review.helpful = Math.max(0, review.helpful - 1);
    } else {
      review.helpfulBy.push(userId);
      review.helpful += 1;
    }
    await review.save();
    return res.json({ message: already ? "Removido" : "Obrigado!", success: true, data: review });
  } catch (error) { console.log("HELPFUL ERROR:", error); return res.status(500).json({ message: error.message, success: false }); }
};