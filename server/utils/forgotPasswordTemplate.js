const forgotPasswordTemplate = ({ name, otp }) => {
  return `
    <div>
      <p>Prezado, ${name}</p>
      <p>Você foi solicitado a redefinir sua senha. Use o seguinte código OTP para redefinir a sua senha.</p>
      <div style="background: yellow; padding: 20px; text-align: center; font-weight: 800;">
        ${otp}
      </div>
      <p>Este OTP é válido por apenas 1 hora. Insira esse código no site B_2025 para prosseguir com a redefinição.</p>
      <br />
      <br />
      <p>Obrigado</p>
      <p>B_2025</p>
    </div>
  `;
};

export default forgotPasswordTemplate;
/*const forgotPasswordTemplate = ({ name, otp }) => {
    return (

        <div>
            <p>Prezado, {name}</p>
            <p>Você foi solicitado a redefinir sua senha. Use o seguinte codigo OTP para redefinir a sua senha.</p>
            <div style={{ background: 'yellow', padding: '20px', textAlign: 'center', fontWeight: 800 }}>
                {otp}
            </div>
            <P>Este otp é valido por apenas 1 hora. Ensira esse otp no site b_2025 para proceguir a definição</P>
            <br />
            <br />
            <p>Obrigado</p>
            <p>B_2025</p>
        </div>

    );
};


export default forgotPasswordTemplate*/