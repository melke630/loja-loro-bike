import mongoose from "mongoose";
import UserModel from "./models/user.model.js"; // ajuste o caminho do seu model

const uri = "mongodb://localhost:27017/<nome_da_sua_base>"; // troque pelo nome da sua base

async function run() {
  try {
    await mongoose.connect(uri);

    const email = "melke7402@gmail.com"; // seu usuário
    const user = await UserModel.findOneAndUpdate(
      { email },
      { $set: { role: "ADMIN" } },
      { new: true }
    );

    console.log("Usuário atualizado:", user);
  } catch (err) {
    console.error("Erro:", err.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

run();