# 🐔 Wild Chicken School - LoginChicks

Bienvenue dans le projet de la **Wild Chicken School** ! Ce dépôt contient le code des pages de **connexion** et d'**inscription** du site de la Wild Chicken School. Notre objectif est de mettre en place un système d'authentification sécurisé avec un **token JWT** stockés dans des **cookies** pour l'authentification.


## 🛠️ Fonctionnalités

- **Inscription** : Les nouveaux utilisateurs peuvent s'inscrire en créant un compte avec un nom d'utilisateur et un mot de passe.
- **Connexion** : Les utilisateurs enregistrés peuvent se connecter en fournissant leurs informations d'identification.
- **Authentification JWT** : Les utilisateurs reçoivent un token JWT sécurisé stocké dans un cookie.
- **Pages protégées** : Certaines pages ne sont accessibles qu'aux utilisateurs authentifiés.
- **Déconnexion** : Les utilisateurs peuvent se déconnecter et leur session est invalidée.


## Mise en place du server:

Ton server devrait ressembler a ceci pour le moment ! 

```bash
└── server/
    ├── node_modules/
    ├── src/
    │   ├── controllers/ 
    │   ├── models/       
    │   ├── routes/   
    │   ├── utils/         
    │   ├── tests/        
    │   └── app.js    
    ├── .gitignore               
    ├── package.json
    └── package-lock.json
```

1. **Configurer Express :**

   - Dans `server/app.js`, configurez un serveur Express simple.

   <details>
   <summary>Voir le code</summary>

   ```javascript
   import express from 'express';
   import cors from "cors"

   const app = express();
   const PORT = process.env.PORT || 5000;

   app.use(cors())
   app.use(express.json());
   
   app.listen(PORT, () => {
       console.log(`Server is running on port ${PORT}`);
   });
   ```

   </details>


2. **Créer la base de données SQLite :**

   Cette étape vous guide pour créer une base de données SQLite et configurer la connexion à cette base.

   - Dans `server/utils/`, créez le fichier `db.js` ainsi que la base de données `LoginChicks.sqlite`.
   - Configurez la connexion à SQLite dans `server/utils/db.js`.

   <details>
   <summary>Voir le code</summary>

   ```javascript
   import sqlite3 from "sqlite3";

   sqlite3.verbose();

   export const db = new sqlite3.Database('./src/utils/LoginChicks.sqlite');

   export const initDB = () => {
       const sqlContent = `
           CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
           )
       `;

       db.exec(sqlContent, (err) => {
           if (err) {
               console.log(`Failed to load SQL query: ${err}`);
           } else {
               console.log(`SQL content loaded`);
           }
       });
   };
   ```

   </details>

   **Explication :**
   - `sqlite3.verbose()` permet d'activer les logs détaillés pour le débogage.
   - `db.exec()` exécute la commande SQL pour créer une table `LoginChickss` si elle n'existe pas déjà.

   Ensuite, importez `initDB` dans `app.js` pour exécuter cette fonction à chaque lancement du serveur.

   <details>
   <summary>Voir le code</summary>

   ```javascript
   import express from "express";
   import cors from "cors"
   import { initDB } from "./utils/db.js";

   const app = express();
   const PORT = process.env.PORT || 5000;

    app.use(cors())
   app.use(express.json());

   initDB();

   app.listen(PORT, () => {
       console.log(`Server is running on port ${PORT}`);
   });
   ```

   </details>

   **Explication :**
   - `initDB()` est appelé pour s'assurer que la table SQL est créée à chaque démarrage du serveur.
   - Vous pourrez ensuite visualiser la table en ouvrant le fichier `LoginChicks.sqlite`.

---

## Inscription : Les nouveaux utilisateurs peuvent s'inscrire en créant un compte avec un nom d'utilisateur et un mot de passe.

1. **Créer le modèle** : Créez un modèle d'utilisateur dans la base de données avec des champs pour le nom d'utilisateur et le mot de passe. Le mot de passe doit être stocké sous forme de hachage sécurisé.
   
2. **Controllers** : Créez un contrôleur qui gère la logique d'inscription. Il doit vérifier si l'utilisateur existe déjà, puis enregistrer le nouvel utilisateur avec un mot de passe hashé.

3. **Routes** : Créez une route POST `/register` pour permettre aux nouveaux utilisateurs de s'inscrire via un formulaire.

4. **Tester la requête HTTP** : Utilisez un outil comme `curl` ou Postman pour envoyer une requête HTTP POST à la route `/register` et vérifier que l'inscription fonctionne.

5. **Connexion au Frontend** : Intégrez l'inscription au frontend React avec un formulaire d'inscription, puis faites une requête POST à l'API lorsque le formulaire est soumis.

---

## Connexion : Les utilisateurs enregistrés peuvent se connecter en fournissant leurs informations d'identification.

1. **Controllers** : Créez un contrôleur qui gère la connexion. Il doit vérifier que l'utilisateur existe et que le mot de passe est correct en le comparant au mot de passe hashé.

2. **Routes** : Créez une route POST `/login` pour permettre aux utilisateurs de se connecter.

3. **Connexion au Frontend** : Dans le frontend, créez un formulaire de connexion qui envoie une requête POST à l'API. Si la connexion est réussie, stockez le token JWT dans un cookie sécurisé.

---

## Authentification JWT : Les utilisateurs reçoivent un token JWT sécurisé stocké dans un cookie.

1. **Ajouter JWT dans le contrôleur login** : Une fois que l'utilisateur est authentifié, générez un token JWT et stockez-le dans un cookie sécurisé. Ce cookie sera utilisé pour l'authentification dans les routes protégées.

2. **Cookie options** : Utilisez des options sécurisées pour les cookies comme `httpOnly`, `secure` et `sameSite` :
   - `httpOnly:` : Empêche JavaScript d'accéder au cookie pour plus de sécurité.
   - `secure:` : Utilisez cette option en production pour s'assurer que le cookie est transmis uniquement via HTTPS.
   - `sameSite:` : Empêche le partage des cookies avec d'autres sites, pour limiter les attaques CSRF.


---

## Pages protégées : Certaines pages ne sont accessibles qu'aux utilisateurs authentifiés.

1. **Frontend : ProtectedRoute** : Utilisez un composant `ProtectedRoute` dans React pour vérifier si l'utilisateur est authentifié avant d'afficher une page protégée. Faites une requête à votre backend pour vérifier si le token JWT est valide en utilisant les cookies.

   <details>
   <summary>Voir le code</summary>

   ```javascript
    import { useEffect, useState } from 'react';
    import { Navigate } from 'react-router-dom';
    import axios from 'axios';

    export default function ProtectedRoute ({ children })  {
        const [isAuthenticated, setIsAuthenticated] = useState(null);

        useEffect(() => {
            const checkAuth = async () => {
                try {
                    const response = await axios.get('http://localhost:5000/api/auth/protected', {
                        withCredentials: true, 
                    });

                    
                    if (response.status === 200) {
                        setIsAuthenticated(true);
                    } else {
                        setIsAuthenticated(false);
                    }
                } catch (error) {
                    console.error('Error during authentication check:', error);
                    setIsAuthenticated(false); 
                }
            };

            checkAuth();
        }, []);

    
        if (isAuthenticated === null) {
            return <div>Loading...</div>;
        }

    
        return isAuthenticated ? children : <Navigate to="/" replace />;
    };
   ```

   </details>

---

## Déconnexion : Les utilisateurs peuvent se déconnecter et leur session est invalidée.

1. **Controller** : Créez un contrôleur qui permet de supprimer le cookie contenant le token JWT pour invalider la session.

2. **Route** : Créez une route POST `/logout` qui permet aux utilisateurs de se déconnecter.

3. **Frontend** : Ajoutez un bouton de déconnexion dans la barre de navigation qui envoie une requête POST à la route `/logout`, puis redirige l'utilisateur vers la page de connexion.

---

Merci d'avoir contribué à la **Wild Chicken School** 🐔!


## Remerciements à l'Auteur des Images

Je tiens à remercier chaleureusement l'auteur des images utilisées dans ce projet.

- Les images sont fournies par [cookie_pom_illustration](https://www.instagram.com/cookie_pom_Illustration/).
- Ces images sont utilisées avec la permission de l'auteur et ne sont pas libres de droit.

Merci à l'auteur pour sa générosité et son autorisation d'utilisation de ses magnifiques images.