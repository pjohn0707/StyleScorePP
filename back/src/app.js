const express = require('express');
const dotenv = require('dotenv').config();
const path = require('path');
const fs = require('fs');
const fileUpload = require('express-fileupload')

const cadastroRouter = require('./routes/cadastroRouter');
const inicialRouter = require('./routes/inicialRouter');
const loginRouter = require('./routes/loginRouter');
const userRouter =  require('./routes/userRouter');


const app = express();
app.set('port', process.env.PORT || 3008);

const cors = require('cors');
app.use(express.json());
app.use(cors());
app.use(fileUpload());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', cadastroRouter);
app.use('/api', inicialRouter);
app.use('/api', loginRouter);
app.use('/api', userRouter);


module.exports = app;