//tres important pour le debugage
export const loger = (req, res, next) => {
	console.info(
    //il te genere la date du jour la methode utilisé et le chemin 
		`${new Date().toLocaleString()} method "${req.method}" on path "${req.path}`,
	);
	next();
};
