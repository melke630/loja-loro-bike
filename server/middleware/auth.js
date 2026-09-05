import jwt from 'jsonwebtoken';

const auth = async (req,res, next) => {
    try {
        const token = 
        req.cookies.accessToken ||
        req?.headers?.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "PROVIDENCIE SEU TOKEN DE ACESSO.",
                error: true,
                success: false,
            });
        }
        
        const decode = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);
        
        if (!decode) {
            return res.status(401).json({
                message: "ACESSO NÃO AUTORIZADO.",
                error: true,
                success: false,
            });
        }

        req.userId = decode.id;

        next();
    } catch (error) {
        return res.status(500).json({
            message: "VOCE NÃO ESTÁ LOGADO",
            error: true,
            success: false,
        });
    }
}
export default auth;

/*import jwt from "jsonwebtoken"; //codigo do compile, se der erro vou ter que usar o antigo

const auth = (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.headers?.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Token não fornecido",
        error: true,
        success: false,
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);

    if (!decoded?.id) {
      return res.status(401).json({
        message: "Token inválido",
        error: true,
        success: false,
      });
    }

    req.userId = decoded.id;
    next();

  } catch (error) {
    return res.status(401).json({
      message: "Token inválido ou expirado",
      error: true,
      success: false,
    });
  }
};

export default auth;*/