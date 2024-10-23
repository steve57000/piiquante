const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: "Veuillez saisir un nom de sauce" },
    manufacturer: { type: String, required: "Veuillez saisir le nom du fabricant"},
    description: { type: String, required: "Veuillez saisir une déscription" },
    mainPepper: { type: String, required: "Veuillez remplir les ingrédients' " },
    imageUrl: { type: String, required: "Une image est nécessaire" },
    heat: { type: Number, required: true },
    likes: { type: Number, required: false },
    dislikes: { type: Number, required: false },
    usersLiked: { type: [String], required: false},
    usersDisliked: { type: [String], required: false},
});

module.exports = mongoose.model('sauces', sauceSchema);