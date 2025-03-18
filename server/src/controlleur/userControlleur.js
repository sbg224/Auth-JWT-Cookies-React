import { json } from "express";
import { User } from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const registere = async (req, res) => {
	const { username, password } = req.body; // filtrer les données reçu

	console.info("verifier");

	if (!username || !password) {
		return res.status(400).json({ message: "Username and password required " });
	}

	const existeUser = await User.findUserBYusername(username);

	if (existeUser) {
		res.status(401).json({ message: "l'utilisateur existe déja" });
		return;
	}

	const hashedPassWord = await bcrypt.hash(password, 10);
	await User.create({
		username: username,
		password: hashedPassWord,
	});
	res.status(201).json({ message: "vous etes bien enregistré" });
};

export const login = async (req, res) => {
	const { username, password } = req.body; // filtrer les données reçu

	const user = await User.findUserBYusername(username);
	if (!user || !(await bcrypt.compare(password, user.password))) {
		return res.status(400).json({ message: "identifiant invalide" });
	}
	console.info(process.env.SECRET_KEY);

	// generer un signature unique
	const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
		expiresIn: "1h",
	});

	res.cookie("authToken", token, {
		httpOnly: false, // empêche js d'accéder aux cookies
		secure: false, // il s'assure que les cookies soit tjrs tranmis via https
		sameSite: "Strict", // il empêche le partage des cookies pour limiter les attaques CSRF
	});
	res.status(200).json({ message: "connexion réussie!" });
};
