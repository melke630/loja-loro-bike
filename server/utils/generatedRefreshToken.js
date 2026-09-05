import UserModel from "../models/user.model.js";
import jwt from 'jsonwebtoken';

const generatedRefreshToken = async (userId) => {
  const token = jwt.sign(
    { id: userId },
    process.env.SECRET_KEY_REFRESH_TOKEN,
    { expiresIn: '7d' }
  );

  await UserModel.updateOne(
    { _id: userId },
    { refreshToken: token }
  );

  return token;
};

export default generatedRefreshToken;




/*import UserModel from "../models/user.model.js";
import jwt from 'jsonwebtoken';
const generatedRefreshToken = async (userId) => {
    return token = await jwt.sign(
        { id: user._id},
         process.env.SECRET_KEY_REFRESH_TOKEN,
        {expiresIn: '7d',}
    );
    
    const UpdateRefreshTokenUser = await UserModel.updateOne(
        { _id: userId },

        { 
          refreshToken: token,
        }
    );
    return token;
}
export default generateRefreshToken;*/


