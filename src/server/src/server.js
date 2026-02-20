require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());

// para testar se o servidor está funcionando
app.get("/", (req, res) => {
  res.send("API rodando 🚀");
});

app.use(routes);

app.listen(3000, () => {
  console.log('Server rodando na porta 3000 🚀');
});