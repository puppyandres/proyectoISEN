const mongoose = require('mongoose')
const Schema = mongoose.Schema

const usersSchema = new Schema({

    Nombre:{
        type: String,
        required: true
    },
    Apellido:{
        type: String,
        required: true
    },
    Correo:{
        type: String,
        required: true
    },
    Contraseña:{
        type: String,
        required: true
    },
    Edad:{
        type: Number,
        required: true
    },
    Nacionalidad:{
        type: String,
        required: true
    },
    Sexo: {
        type: String,
        enum: ['Hombre', 'Mujer'],
        required: true
    }
}, {timestamps:true});

const Usuarios = mongoose.model('user', usersSchema)//dentro del paréntesis nombre de la colección(mongodb)
module.exports = Usuarios;