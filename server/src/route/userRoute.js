import express from "express";
import * as userControlleur from "../controlleur/userControlleur.js";

const router = express.Router();

router.post("/register", userControlleur.registere);
router.post("/login", userControlleur.login);



export default router