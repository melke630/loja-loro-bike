/*
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/connectDB.js';
import userRouter from './route/user.route.js';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import categoryRouter from './route/category.route.js';
import uploadRouter from './route/upload.router.js';
import subCategoryRouter from './route/subCategoy.route.js';
import productRouter from './route/product.route.js';

dotenv.config();

const app = express();

app.use(
  cors(
    {credentials: true,
  origin: process.env.FRONTEND_URL
})
);

//codi do copile


app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(helmet({
  crossOriginResourcePolicy: false
}));

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.json({ message: 'Servidor se comunicando com frontend' });
});

app.use('/api/user', userRouter);
app.use('/api/category', categoryRouter);
app.use('/api/file', uploadRouter);
app.use('/api/subcategory', subCategoryRouter);
app.use('/api/product', productRouter);
// 🔑 só chama a conexão uma vez
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
  });
});
*/


// codigo do gemini
/*
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/connectDB.js';
import userRouter from './route/user.route.js';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import categoryRouter from './route/category.route.js';
import uploadRouter from './route/upload.router.js';
import subCategoryRouter from './route/subCategoy.route.js';
import productRouter from './route/product.route.js';
//codigo do copilote
import cartRouter from "./routes/cart.route.js";


dotenv.config();

const app = express();

// Configuração de diretório para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuração do CORS
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL || 'http://localhost:5173'
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(
  helmet({
    crossOriginResourcePolicy: false
  })
);

// 🚨 CORREÇÃO DAS IMAGENS: Serve a pasta 'uploads' publicamente
// Ajuste 'uploads' se o nome da sua pasta de arquivos salvos for outro (ex: 'public', 'images')
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.json({ message: 'Servidor se comunicando com frontend' });
});

app.use('/api/user', userRouter);
app.use('/api/category', categoryRouter);
app.use('/api/file', uploadRouter);
app.use('/api/subcategory', subCategoryRouter);
app.use('/api/product', productRouter);

// Conexão com o banco de dados
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
  });
});
*/


// codigo do gemini

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';

// Configuração do Banco de Dados
import connectDB from './config/connectDB.js';

// Importação das Rotas
import userRouter from './route/user.route.js';
import categoryRouter from './route/category.route.js';
import uploadRouter from './route/upload.router.js';
import subCategoryRouter from './route/subCategoy.route.js';
import productRouter from './route/product.route.js';
import cartRouter from './route/cart.route.js'; // 🟢 Pasta 'route' no singular e caminho corrigido
import orderRouter from './route/order.route.js'; // O arquivo de rotas que criamos antes
import addressRouter from './route/address.route.js';
import bannerRouter from './route/banner.route.js';

dotenv.config();

const app = express();

// Configuração de diretório para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL || 'http://localhost:5173'
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(
  helmet({
    crossOriginResourcePolicy: false
  })
);

// Servir arquivos estáticos locais (se houver)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rota de Teste
app.get('/', (req, res) => {
  res.json({ message: 'Servidor se comunicando com frontend' });
});

// Registro de Rotas da API
app.use('/api/user', userRouter);
app.use('/api/category', categoryRouter);
app.use('/api/file', uploadRouter);
app.use('/api/subcategory', subCategoryRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter); // 🟢 Cadastrado após a inicialização do 'app'
app.use('/api/order', orderRouter); // 🟢 Cadastrado após a inicialização do 'app'
app.use('/api/address', addressRouter); // 🟢 Cadastrado após a inicialização do 'app'
app.use('/api/banner', bannerRouter);

const PORT = process.env.PORT || 8080;

// Conexão com o Banco de Dados e Inicialização do Servidor
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
  });
});

