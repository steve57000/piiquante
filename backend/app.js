const express = require('express');

const mongoose = require('mongoose');

const helmet = require('helmet');
const path = require("path");

require('dotenv').config();

const stuffRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');


const app = express();
mongoose.connect(process.env.SECRET_DB,
    { useNewUrlParser: true, useUnifiedTopology: true }
)
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(helmet());
app.use(helmet({crossOriginResourcePolicy: { policy: "cross-origin"} }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());
app.use(express.urlencoded({extended: false }));

app.use('/api/sauces', stuffRoutes);
app.use('/api/auth', userRoutes, stuffRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;