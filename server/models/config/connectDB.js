import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config( );

if (!process.env.MONGODB_URI) {
    throw new Error('ESTA STRING DE CONEXÃO COM O BANCO NÃO ESTÁ CONFIGURADO CORRETAMENTE COM .ENV');
}

async function connectDB () {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Conectado ao banco de dados MongoDB com sucesso!');
    } catch (error) {
        console.log('Erro ao conectar ao banco de dados MongoDB:', error);
        process.exit(1);
    }
}
export default connectDB;