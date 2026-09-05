/*
import uploadImageCloudinary from "../utils/uploadImageCloudinary.js"

const uploadImageController = async(request,response)=>{
    try {
       console.log("Arquivo recebido pelo multer:", request.file); // 👈 teste

        const file = request.file

        const uploadImage = await uploadImageCloudinary(file)

        return response.json({
            message : "Carregado com sucesso",
            data : uploadImage,
            success : true,
            error : false
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export default uploadImageController;
*/
//codigo do copilet
/*import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImageController = async (request, response) => {
  try {
    const file = request.file;
    if (!file) {
      return response.status(400).json({
        message: "Nenhum arquivo enviado",
        error: true,
        success: false,
      });
    }

    const result = await cloudinary.uploader.upload(file.path, {
      folder: "categories",
    });

    return response.json({
      success: true,
      error: false,
      message: "Upload realizado com sucesso",
      url: result.secure_url, // ✅ frontend usa isso
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export default uploadImageController;*/
//codido do gemini
import uploadImageCloudinary from "../utils/uploadimageCloudinary.js";

const uploadImageController = async (request, response) => {
  try {
    const file = request.file;

    if (!file) {
      return response.status(400).json({
        message: "Nenhum arquivo enviado",
        error: true,
        success: false,
      });
    }

    const uploadImage = await uploadImageCloudinary(file);

    return response.json({
      message: "Carregado com sucesso",
      data: {
        url: uploadImage.secure_url || uploadImage.url,
        public_id: uploadImage.public_id,
      },
      success: true,
      error: false,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export default uploadImageController;