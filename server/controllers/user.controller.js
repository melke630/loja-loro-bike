import sendEmail from '../models/config/sendEmail.js';
import UserModel from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import verifyEmailTemplate from '../utils/verifyEmailTemplate.js';
// verifyEmailController from '../utils/verifyEmailController.js';
import generatedAccessToken from '../utils/generatedAccessToken.js';
import uploadImageCloudinary from '../utils/uploadimageCloudinary.js';
import generatedOtp from '../utils/generatedOtp.js';
import forgotPasswordTemplate from '../utils/forgotPasswordTemplate.js';
import generatedRefreshToken from '../utils/generatedRefreshToken.js';
import jwt from "jsonwebtoken";
import { error } from 'console';
//import { setUserDetails } from '../../client/src/store/userSlice.js';

export async function registerUserController(req, res) {
    try {

        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).send({
                message: "TODOS ESTES COMPOS SÃO OBRIGATORIOS",
                error: true,
                success: false
            });
        }

        const user = await UserModel.findOne({ email });
        //if (error) {
        if (user) {
            return res.send({
                message: "EMAIL JA EXISTE",
                error: true,
                success: false

            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const payload = {
            name,
            email,
            password: hashedPassword
        };

        const newUser = new UserModel(payload);
        const save = await newUser.save();

        const VerifyEmail = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`;

        const verifyEmail = await sendEmail({
            sendTo: email,
            subject: "VERIFIQUE SEU EMAIL - LOJA LORO BIKE",
            html: verifyEmailTemplate({
                name,
                url: VerifyEmail,

            })
        });

        return res.send({
            message: "USUARIO REGISTRADO COM SUCESSO.",
            error: false,
            success: true,
            data: save,
            emailStatus: verifyEmail
        });

    } catch (error) {
        return res.status(500).send({
            message: error.message || error,
            error: true,
            success: false

        });
    }
}

// VERIFICAR EMAIL
export async function loginController(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "TODOS OS CAMPOS SÃO OBRIGATÓRIOS.",
                error: true,
                success: false,
            });
        }
        
        const user = await UserModel.findOne({email});
        if (!user) {
            return res.status(404).json({
                message: "ESTE USUÁRIO NÃO EXISTE.",
                error: true,
                success: false
            });
        }
        
        if (user.status !== "Active") {
           return res.status(400).json({
                message: "ENTRA EM CONTATO COM O SEU ADMISTRADOR.",
                error: true,
                success: false,
            });
        }
        // parei aqui 16:43
        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            return res.status(400).json({
                message: "SENHA INCORRETA, DIGITE A SENHA CORRETAMENTE.",
                error: true,
                success: false, 
            });
        }

        const accessToken = await generatedAccessToken(user._id);
        const refreshToken = await generatedRefreshToken(user._id);

        const updateUser = await UserModel.findByIdAndUpdate(user?._id ,{
          last_login_date: new Date(),
        });

        /*const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
        };*/

        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production" ? true : false,
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",

          };

        res.cookie('accessToken', accessToken, cookieOptions);
        res.cookie('refreshToken', refreshToken, cookieOptions);

        /*return res.json({
            message: "LOGADO COM SUCESSO.",
            error: false,
            success: true,
            data: user,
        });*/
        return res.json({
          message: "LOGADO COM SUCESSO.",
          error: false,
          success: true,
          data: {
              _id: user._id,
              name: user.name,
              email: user.email,
              mobile: user.mobile,
              avatar: user.avatar,
              status: user.status,
              role: user.role, // <-- aqui está o papel
              last_login_date: user.last_login_date,
          },
          accessToken,
          refreshToken,
  });
    } catch (error) {
         console.log("Erro no login:", error); // 👈 
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
}

export async function logoutController(req, res) {
    try {
        const userid = req.userId;

        const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
        }
        res.clearCookie("accessToken",cookieOptions)
        res.clearCookie("refreshToken",cookieOptions)

        // const removeRefreshToken = await UserModel.findByidAndupdate(userid, {
        //     refreshToken: "",
        // })

        return res.json({
            message: "SAINDO DO SISTEMA COM SEGURANÇA.",
            error: false,
            success: true,
            sameSite: 'None',
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
}

//codigo do copilot
export async function verifyEmailController(req, res) {
  try {
    const {code} = req.body;

    const user = await UserModel.findById(code);

    if (!user) {
      return res.status(404).json({
        message: "Usuário não encontrado.",
        error: true,
        success: false
      });
    }

    if (user.status === "Active") {
      return res.status(400).json({
        message: "Usuário já está verificado.",
        error: true,
        success: false
      });
    }

    user.status = "Active";
    await user.save();

    return res.status(200).json({
      message: "E-mail verificado com sucesso!",
      error: false,
      success: true
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message || "Erro interno.",
      error: true,
      success: false
    });
  }
}

export async function uploadAvatar(req, res) {
  console.log('req.file:', req.file);

  try {
    const userId = req.userId;

    if (!req.file || !req.file.path) {
      return res.status(400).json({
        message: "Nenhum arquivo foi enviado.",
        error: true,
        success: false,
      });
    }

    const imagePath = req.file.path;

    // Envia o caminho do arquivo para o Cloudinary
    const upload = await uploadImageCloudinary(imagePath);

    await UserModel.findByIdAndUpdate(userId, {
      avatar: upload.url,
    });
    // Agora busca o usuário COMPLETO // trecho de codigo do copile
    const fullUser = await UserModel.findById(userId).select("-password");


    return res.json({
      message: "Avatar atualizado com sucesso!",
      success: true,
      error: false,
      data: {
        _id: userId,
        avatar: upload.url,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Erro ao fazer o upload do avatar",
      error: true,
      success: false,
    });
  }
}
//codigo do copilote
/*export async function uploadAvatar(req, res) {
  try {
    const userId = req.userId;

    if (!req.file || !req.file.path) {
      return res.status(400).json({
        message: "Nenhum arquivo foi enviado.",
        error: true,
        success: false,
      });
    }

    const imagePath = req.file.path;

    // Upload para o Cloudinary
    const upload = await uploadImageCloudinary(imagePath);

    // Atualiza e retorna o usuário atualizado
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { avatar: upload.url },
      { new: true } // ✅ retorna o usuário atualizado
    ).select("-password");

    return res.json({
      message: "Avatar atualizado com sucesso!",
      success: true,
      error: false,
      data: updatedUser, // ✅ retorna o usuário COMPLETO
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message || "Erro ao fazer o upload do avatar",
      error: true,
      success: false,
    });
  }
}*/


     
export async function updateUserDetails(req, res) {
  try {
    const userId = req.userId;
    const { name, email, mobile, password } = req.body;

    let hashPassword;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashPassword = await bcrypt.hash(password, salt);
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        ...(name && { name }),
        ...(email && { email }),
        ...(mobile && { mobile }),
        ...(password && { password: hashPassword }),
        ...(req.body.role && { role: req.body.role }), // <-- adicionei aqui o codigo do copile

      },
      { new: true, select: "-password -refresh_token" } // retorna documento atualizado sem senha
    );

    return res.json({
      message: "ATUALIZADO COM SUCESSO",
      error: false,
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function forgotPasswordController(req,res){
    try {
        const { email } = req.body
        const user = await UserModel.findOne({ email})
    if(!user){
        return res.status(400).json({
            message: "E-mail não disponível",
            error: true,
            success: false
        })
    }
    
    const otp = generatedOtp()
    //const expireTime = new Date() + 60 * 60 * 1000
    const expireTime = new Date(Date.now() + 60 * 60 * 1000) // corrigido pelo copilot
    //const update = await UserModel.findByIdAndUpdate(user._id,{
        //forgot_password_otp: otp,
        //forgot_password_expiry: new Date(expireTime).toISOString()
    //})

    const update = await UserModel.findByIdAndUpdate(user._id, {
    forgot_password_otp: otp,
    forgot_password_expiry: expireTime.toISOString()
}, { new: true }); // 'new: true' retorna o documento atualizado

console.log("Usuário atualizado:", update);

    await sendEmail({
        sendTo : email,
        subject: "ESQUECEU SUA SENHA? b_2025",
        html: forgotPasswordTemplate({
            name: user.name,
            otp: otp
        })
    })
    
    return res.json({
        message: "FAVOR CHECAR SEU EMAIL",
        error: false,
        success: true
    })

    }catch (error){
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function verifyForgotPasswordOtp(req, res) {
  try {
    console.log('REQ.BODY:', req.body);
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        message: "Forneça o e-mail e o código OTP.",
        error: true,
        success: false
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "Usuário não encontrado.",
        error: true,
        success: false
      });
    }

    const currentTime = new Date().toISOString();

    if (user.forgot_password_expiry < currentTime) {
      return res.status(400).json({
        message: "O código OTP expirou.",
        error: true,
        success: false
      });
    }

    if (user.forgot_password_otp !== otp) {
      return res.status(400).json({
        message: "Código OTP inválido.",
        error: true,
        success: false
      });
    }

    return res.status(200).json({
      message: "Código OTP verificado com sucesso.",
      error: false,
      success: true
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message || "Erro interno.",
      error: true,
      success: false
    });
  }
}

export async function resetpassword(req, res){
    try{
        const { email, newPassword, confirmPassword } = req.body
        
        if(!email || !newPassword || !confirmPassword){
            return res.status(400).json({
                message: "forneça os compos obrigatórios e-mail, nova senha, confirme senha"
            })
        }
        
        const user = await UserModel.findOne({ email })

        if(!user){
            return res.status(400).json({
                message: "O e-mail não está disponível",
                error: true,
                success: false
            })
        }

        if(newPassword !== confirmPassword){
            return res.status(400).json({
                message: "A nova senha e a confirmação da senha devem ser as mesmas.",
                error: true,
                success: false,
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        //const update = await UserModel.findOneAndUpdate(user._id,{
           // password : hashedPassword

        await UserModel.findOneAndUpdate({ _id: user._id }, {
            password: hashedPassword
        })

        return res.json({
            message: "Senha atualizada com sucesso.",
        })

    } catch (error) {
        return res.status(500).json({
          message: error.message || error,
          error: true,
          success: false 
         
        })
    }
}

export async function refreshToken(req, res) {
  try {
    const refreshToken = req.cookies.refreshToken || res?.headers?.authorization?.split("")[1]

    if(!refreshToken){
      return res.status(401).json({
        message: "Token inválido",
        error: "true",
        success: "false"
      })
    }

    const verifyToken = await jwt.verify(refreshToken,process.env.SECRET_KEY_REFRESH_TOKEN)

    if(!verifyToken){
      return res.status(401).json({
        message: "O Token expirou",
        error: "true",
        success: "false"
      })
    }

    const userId = verifyToken?._id

    const newAccessToken = await generatedAccessToken(userId)

    const cookiesOption = {
        httpOnly: true,
        secure: true,
        sameSite: "None"
    }

    res.cookie('accessToken', newAccessToken,cookiesOption)

    return res.json({
      message: "Novo token de acesso gerado",
      error: false,
      success: true,
      data: {
        accessToken: newAccessToken
      }
    })

  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    })
  }
}

/*export async function userDetails(req, res) {
  try {
      const userId = req.userId;

      const user = await UserModel.findById(userId).select("-password -refresh_token");

        return res.json({
          massage : "Detalhes do usuário",
          error : true,
          success: false,
          data: user,
        });
  } catch (error) {
    return res.status(500).json({
      message : error.message || error,
      error : true,
      success : false
    });
  }
}*/
export async function userDetails(req, res) {/*codigo do copilot*/
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({
        message: "ID do usuário não fornecido",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findById(userId).select("-password -refresh_token");

    if (!user) {
      return res.status(404).json({
        message: "Usuário não encontrado",
        error: true,
        success: false,
      });
    }

    return res.json({
      message: "Detalhes do usuário",
      error: false,
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Erro em userDetails:", error);
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
// codigo do copile
export async function makeAdmin(req, res) {
  try {
    const { email } = req.body; // ou pode usar req.params.id se preferir
    const user = await UserModel.findOneAndUpdate(
      { email },
      { $set: { role: "ADMIN" } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        message: "Usuário não encontrado",
        error: true,
        success: false,
      });
    }

    return res.json({
      message: "Usuário promovido a ADMIN",
      error: false,
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}