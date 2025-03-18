import express from "express";
import cors from "cors";
import { initDB } from "./utils/db.js";
import Userouter from "./route/userRoute.js";
import { loger } from "./midelware/loger.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"



const app = express();
console.info(process.env.SECRET_KEY)
const PORT = process.env.PORT || 3312;

app.use(loger);
app.use(
	cors({
		credentials: true,
	}),
);

app.use(express.json());

app.use(cookieParser());

app.use("/api/user", Userouter);

//function lié à la bdd
initDB();

app.listen(PORT, () => {
	console.info(`le server ecoute sur le port: http://localhost:${PORT}`);
});
