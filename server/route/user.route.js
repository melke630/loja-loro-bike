import {Router} from "express";
import {
    forgotPasswordController, // ✅ adicionei aqui
    logoutController,
    refreshToken,
    registerUserController,
    resetpassword,
    updateUserDetails,
    uploadAvatar,
    loginController,
    verifyEmailController,
    verifyForgotPasswordOtp,
    userDetails,
    makeAdmin, 
} from "../controllers/user.controller.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";


const userRoute = Router(); // ✅ Aqui você usa o Router
userRoute.put("/make-admin", makeAdmin); //codigo do copile
userRoute.post("/register", registerUserController);
userRoute.post("/verify-email", verifyEmailController);
userRoute.post("/login", loginController);
userRoute.get("/logout", auth, logoutController); 
userRoute.put("/upload-avatar", auth,upload.single('avatar'), uploadAvatar); //vou mudar o get pelo put
userRoute.put("/update-user", auth, updateUserDetails);
userRoute.put("/forgot-password", forgotPasswordController);
userRoute.put("/verify-forgot-password-otp", verifyForgotPasswordOtp);
userRoute.put("/reset-password", resetpassword);
userRoute.post("/refresh-token", refreshToken);
userRoute.get("/user-details",auth,userDetails);


export default userRoute;
