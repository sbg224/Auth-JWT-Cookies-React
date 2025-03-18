import  sqlite3 from "sqlite3";


//pour avoir le detail des erreurs 
sqlite3.verbose()

//creation de la bdd depuis sqlite
export const db = new sqlite3.Database("./src/utils/login.sqlite");

export const initDB = () => {
  const sqlContent = `
      CREATE TABLE IF NOT EXISTS users (
id INTEGER PRIMARY KEY AUTOINCREMENT,
username TEXT UNIQUE,
password TEXT
      )
  `;
  //il execute la requête au dessus
  db.exec(sqlContent, (err) => {
    if(err){
      console.error(`Failed to load SQL query: ${err}`);
    }
    console.info("le contenu sql a été chargé avec succé")
  })
}