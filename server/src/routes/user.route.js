import { Router } from "express";
import { checkAuth, logout, signIn, signUp } from "../controllers/user.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";


const router = Router();

router.post('/sign-up',signUp)
router.post('/sign-in',signIn)
router.get('/logout',logout);

router.get('/check',protectRoute,checkAuth)


export default router;