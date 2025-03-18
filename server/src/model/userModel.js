import { db } from "../utils/db.js";

// initialliser un creat avec une class d'objet
export const User = {
	create: (Credential) => {
		const query = "INSERT INTO users (username, password) VALUES (?, ?)"; // requête sql
		const params = [Credential.username, Credential.password]; // les arguments

		return new Promise((resolve, reject) => {
			db.run(query, params, (err) => {
				if (err) {
					reject(err);
				}
				resolve();
			});
		});
	},
// verifier si l'username existe
	findUserBYusername: (username) => {
		const query = "SELECT * FROM users WHERE username = ?"; // requête sql
		const params = [username]; // les arguments

		return new Promise((resolve, reject) => {
			db.get(query, params, (err, row) => {
				if (err) {
					reject(err);
				}
				resolve(row);
			});
		});
	},
};
