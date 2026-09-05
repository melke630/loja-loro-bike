const generatedOtp = ()=>{
    return Math.floor(Math.random() * 900000) + 100000
}
export default generatedOtp

//const generatedOtp = () => {
  //return String(Math.floor(Math.random() * 900000) + 100000);// Mas isso só é necessário se você estiver tratando o OTP como texto em algum lugar
  //  (como em templates de e-mail ou banco de dados).
//};