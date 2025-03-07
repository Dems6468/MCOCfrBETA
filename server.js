const express = require('express');
const path = require('path');
const app = express();

// Servir le fichier 'data.json' lorsqu'une requête GET est faite
app.get('/data', (req, res) => {
  res.sendFile(path.join(__dirname, 'data.json'));
});

// Serveur sur le port 3000
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
