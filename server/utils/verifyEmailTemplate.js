const verifyEmailTemplate = ({ nome, url }) => {
  return `
    <p>Olá ${nome},</p>
    <p>Obrigado por se cadastrar na Loja Loro Bike!</p>
    <a href="${url}" style="color:black; background:orange; margin-top:10px; padding:20px; display:block; text-decoration:none;">
      Verificar o Email
    </a>
  `;
};

export default verifyEmailTemplate;