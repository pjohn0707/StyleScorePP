const express = require('express');
const dotenv = require('dotenv').config();

const cadastroRouter = require('./routes/cadastroRouter');
const inicialRouter = require('./routes/inicialRouter');
const loginRouter = require('./routes/loginRouter');

const app = express();
app.set('port', process.env.PORT || 3008);

const cors = require('cors');
app.use(express.json());
app.use(cors());

app.use('/api', cadastroRouter);
app.use('/api', inicialRouter);
app.use('/api', loginRouter);

module.exports = app;