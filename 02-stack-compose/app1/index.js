const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Infos de connexion à MySQL depuis les variables d’environnement Docker
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'app1db'
});

// Connexion à la base
connection.connect(err => {
  if (err) {
    console.error('Erreur de connexion à MySQL :', err.message);
    process.exit(1);
  }
  console.log('✅ Connected to MySQL');
});

// Route principale
app.get('/', (req, res) => {
  res.send('Mysql connection successful');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
