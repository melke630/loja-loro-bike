/*import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});

const uploadImageCloudinary = async (image) => {
    const buffer = image?.buffer || Buffer.from(await image.arryBuffer());

    const uploadImage = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            {
                folder: 'B_2025',
            },
            (error, uploadResult) => {
                 if (error) return reject(error); // agora o reject é usado
                return resolve(uploadResult);
            }).end(buffer);
        return uploadImage
    });
}

export default uploadImageCloudinary;*/

/*import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

// ⚠️ A configuração do Cloudinary deve vir antes de qualquer uso
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // ✅ nome correto da variável
});

const uploadImageCloudinary = async (filePath) => {
  try {
    // Garante caminho absoluto (útil no Windows)
    const fullPath = path.resolve(filePath);

    const result = await cloudinary.uploader.upload(fullPath, {
      folder: 'B_2025',
    });

    // Remove o arquivo local após o upload
    fs.unlinkSync(fullPath);

    return result; // contém .url, .secure_url, .public_id, etc.
  } catch (error) {
    console.error('Erro Cloudinary:', error); // log útil para debug
    throw new Error('Erro ao enviar imagem para o Cloudinary: ' + error.message);
  }
};

export default uploadImageCloudinary;*/
//meu codigo
/*
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImageCloudinary = async (file) => {
  try {
    const fullPath = path.resolve(file.path);

    const result = await cloudinary.uploader.upload(fullPath, {
      folder: 'B_2025',
    });

    fs.unlinkSync(fullPath); // remove arquivo local após upload

    return result;
  } catch (error) {
    console.error('Erro Cloudinary:', error);
    throw new Error('Erro ao enviar imagem para o Cloudinary: ' + error.message);
  }
};

export default uploadImageCloudinary;
*/
/*
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImageCloudinary = async (file) => {
  try {
    if (!file || !file.path) {
      throw new Error("Arquivo não recebido pelo upload");
    }

    const fullPath = path.resolve(file.path);

    const result = await cloudinary.uploader.upload(fullPath, {
      folder: 'B_2025',
    });

    // Remove o arquivo local temporário após o envio
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }

    return result;
  } catch (error)//Seu código atual está **funcional para uploads baseados no sistema de arquivos local** (salvando com Multer em disco temporário e limpando depois). No entanto, há três pontos cruciais que podem ser otimizados para evitar falhas em produção.

*/

// Versão Otimizada e Corrigida


import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImageCloudinary = async (file) => {
  // 1. Validação do parâmetro do arquivo
  if (!file || !file.path) {
    throw new Error('Nenhum arquivo válido fornecido para upload.');
  }

  const fullPath = path.resolve(file.path);

  try {
    // 2. Upload para o Cloudinary
    const result = await cloudinary.uploader.upload(fullPath, {
      folder: 'B_2025',
      resource_type: 'auto', // Permite enviar imagens, vídeos ou PDFs sem erro
    });

    return result;
  } catch (error) {
    console.error('Erro no upload para o Cloudinary:', error);
    throw new Error(`Erro ao enviar imagem para o Cloudinary: ${error.message}`);
  } finally {
    // 3. Garantia de remoção do arquivo temporário mesmo se o upload falhar
    if (fs.existsSync(fullPath)) {
      try {
        fs.unlinkSync(fullPath);
      } catch (unlinkError) {
        console.error('Erro ao remover arquivo temporário:', unlinkError);
      }
    }
  }
};

export default uploadImageCloudinary;