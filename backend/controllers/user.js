const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const cryptoJs = require('crypto-js');



require('dotenv').config();

exports.signup = (req, res, next) => {
    const hashedEmail = cryptoJs.HmacSHA512(req.body.email.toLowerCase(), process.env.SECRET_CRYPTOJS_TOKEN).toString(cryptoJs.enc.Base64);
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            let user = new User({
                email: hashedEmail,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({message: 'Utilisateur créé !'}))
                .catch(error => res.status(400).json({message: 'Utilisateur déja dans la base de donnée'}));
        })
        .catch(error => res.status(500).json({error}));
};

exports.login = (req, res, next) => {
    const hashedEmail = cryptoJs.HmacSHA512(req.body.email.toLowerCase(), process.env.SECRET_CRYPTOJS_TOKEN).toString(cryptoJs.enc.Base64);
    User.findOne({email: hashedEmail})
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !'});
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !'})
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            {userId: user._id},
                            process.env.SECRET_TOKEN,
                            {expiresIn: '24h'}
                        )
                    });
                })
                .catch(error=> res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};