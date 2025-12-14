const express = require('express');
const cors = require('cors');
// Importa a pasta routes (ele acha o index.js sozinho)
const routes = require('./routes'); 

const app = express();

app.use(cors());
app.use(express.json());

// Avisa pro Express usar suas rotas
app.use(routes); 

app.listen(3000, () => {
  console.log('Server rodando na porta 3000 🚀');
});