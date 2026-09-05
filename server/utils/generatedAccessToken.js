import jwt from 'jsonwebtoken';

const generateAccessToken = async (userId) => {
  const token = jwt.sign(
    { id: userId },
    process.env.SECRET_KEY_ACCESS_TOKEN,
    { expiresIn: '1800s' }
  );
  return token;
};

export default generateAccessToken;

/*import jwt from 'jsonwebtoken';

const generateAccessToken = async (userId) => {
    return token = await jwt.sign({ id: user._id}, process.env.SECRET_KEY_ACCESS_TOKEN,
        {expiresIn: '1800s',});
        return token;
}
export default generateAccessToken;*/