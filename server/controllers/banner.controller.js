// até que funciona

import BannerModel from "../models/banner.model.js";

// Cadastrar novo banner
export const AddBannerController = async (request, response) => {
    try {
        const { title, imageDesktop, imageMobile, redirectTo } = request.body;

        const banner = new BannerModel({
            title: title || "",
            
            imageDesktop: imageDesktop || "",
            imageMobile: imageMobile || "",
            redirectTo: redirectTo || ""
        });

        const saveBanner = await banner.save();

        return response.json({
            message: "Banner adicionado com sucesso",
            error: false,
            success: true,
            data: saveBanner
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};

// Obter banners
export const GetBannerController = async (request, response) => {
    try {
        const banners = await BannerModel.find().sort({ createdAt: -1 });

        return response.json({
            message: "Lista de banners",
            error: false,
            success: true,
            data: banners
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};

// Atualizar banner
export const UpdateBannerController = async (request, response) => {
    try {
        const { id } = request.params;
        const { imageDesktop, imageMobile, title, redirectTo } = request.body;

        const updateData = {};
        if (imageDesktop !== undefined) updateData.imageDesktop = imageDesktop;
        if (imageMobile !== undefined) updateData.imageMobile = imageMobile;
        if (title !== undefined) updateData.title = title;
        if (redirectTo !== undefined) updateData.redirectTo = redirectTo;

        const updatedBanner = await BannerModel.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true }
        );

        if (!updatedBanner) {
            return response.status(404).json({
                message: "Banner não encontrado",
                error: true,
                success: false
            });
        }

        return response.json({
            message: "Banner atualizado com sucesso",
            error: false,
            success: true,
            data: updatedBanner
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};

// Deletar banner
export const DeleteBannerController = async (request, response) => {
    try {
        const { id } = request.params;

        if (!id) {
            return response.status(400).json({
                message: "ID do banner não fornecido",
                error: true,
                success: false
            });
        }

        const deleteBanner = await BannerModel.findByIdAndDelete(id);

        if (!deleteBanner) {
            return response.status(404).json({
                message: "Banner não encontrado no banco de dados",
                error: true,
                success: false
            });
        }

        return response.json({
            message: "Banner deletado com sucesso",
            error: false,
            success: true,
            data: deleteBanner
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}; 

// novo codigo para ver se funciona
/*
import BannerModel from "../models/banner.model.js";

// Cadastrar novo banner (com Desktop e Mobile)
export const AddBannerController = async (request, response) => {
    try {
        const { title, imageDesktop, imageMobile, redirectTo } = request.body;

        const banner = new BannerModel({
            title: title || "",
            imageDesktop: imageDesktop || "",
            imageMobile: imageMobile || "",
            redirectTo: redirectTo || ""
        });

        const saveBanner = await banner.save();

        return response.json({
            message: "Banner adicionado com sucesso",
            error: false,
            success: true,
            data: saveBanner
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};

// Obter banners
export const GetBannerController = async (request, response) => {
    try {
        const banners = await BannerModel.find().sort({ createdAt: -1 });

        return response.json({
            message: "Lista de banners",
            error: false,
            success: true,
            data: banners
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};

// Atualizar banner
export const UpdateBannerController = async (request, response) => {
    try {
        const { id } = request.params;
        const { imageDesktop, imageMobile, title, redirectTo } = request.body;

        const updateData = {};
        if (imageDesktop !== undefined) updateData.imageDesktop = imageDesktop;
        if (imageMobile !== undefined) updateData.imageMobile = imageMobile;
        if (title !== undefined) updateData.title = title;
        if (redirectTo !== undefined) updateData.redirectTo = redirectTo;

        const updatedBanner = await BannerModel.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true }
        );

        if (!updatedBanner) {
            return response.status(404).json({
                message: "Banner não encontrado",
                error: true,
                success: false
            });
        }

        return response.json({
            message: "Banner atualizado com sucesso",
            error: false,
            success: true,
            data: updatedBanner
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};

// Deletar banner
export const DeleteBannerController = async (request, response) => {
    try {
        const { id } = request.params;

        if (!id) {
            return response.status(400).json({
                message: "ID do banner não fornecido",
                error: true,
                success: false
            });
        }

        const deleteBanner = await BannerModel.findByIdAndDelete(id);

        if (!deleteBanner) {
            return response.status(404).json({
                message: "Banner não encontrado no banco de dados",
                error: true,
                success: false
            });
        }

        return response.json({
            message: "Banner deletado com sucesso",
            error: false,
            success: true,
            data: deleteBanner
        });
    } catch (error) {
        return response.status(500).json({
            message: error.status || 500,
            error: true,
            success: false
        });
    }
}; */