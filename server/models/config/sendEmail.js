import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.RESEND_API) {
  console.log("ESTA CHAVE DO RESEND NÃO ESTÁ NO ARQUIVO .env");
}

const resend = new Resend(process.env.RESEND_API);

const sendEmail = async ({ nome, sendTo, subject, html }) => {
  try {
    const { data, error } = await resend.emails.send({
      from: `LOJA-LORO-BIKE <onboarding@resend.dev>`,
      to: [sendTo],
      subject: subject,
      html: html.replace('{nome}', nome) // se quiser interpolar o nome no HTML
    });

    if (error) {
      console.error("Erro ao enviar email:", error);
      return null;
    }

    return data;

  } catch (error) {
    console.log("ERRO AO ENVIAR EMAIL", error);
    return null;
  }
};

export default sendEmail;