const express = require('express')
const app = express()
const morgan = require('morgan');
const fs = require('fs')
const mongoose = require('mongoose')
const User = require('./models/users')
const path = require('path')
const PORT = 3000

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

const dbURI = 'mongodb+srv://admin:1234@clasenode.4a4qi.mongodb.net/UsersDB'

mongoose.connect(dbURI)
    .then((resultado) => app.listen(PORT))
    .catch((error) => console.log(error))

//console.log('esto se ejecuta antes o después de la BBDD?')

//registrar EJS
app.set('view engine', 'ejs')
//especificar la carpeta que contiene las vistas
app.set('views', 'vistas')

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev', { stream: accessLogStream }))

//página principal
app.get('/', function (req, res) {
    User.find()
        .then((resultado) => {
            res.render('main', { title: 'INICIO', users: resultado , stylesheet: '/estiloMain.css'});
        })
        .catch((error) => {
            console.log(error)
        })
});

//mostrar todos los usuarios
app.get('/todos-los-usuarios', function (req, res) {
    User.find()
    .then((resultado) => {
        //console.log('paso por aqui')
        res.send(resultado)
    })
    .catch((error) => {
        console.log(error)
    })
})

//buscar un usuario en concreto
app.get('/buscar-un-usuario', function (req, res) {
    User.findById('6734ed478599e64549ea7523')
    .then((resultado) => {
        //console.log('paso por aqui')
        res.send(resultado)
    })
    .catch((error) => {
        console.log(error)
    })
})

//about
app.get('/about', function (req, res) { //o function o =>
    res.render('about', {title: 'ACERCA DE', stylesheet: '/estiloAcercaDe.css'});
})

//users/crear
app.get('/users/crear', function (req, res) { //o function o =>
    res.render('crear', {title: 'Crear Usuario', stylesheet: '/estiloCrear.css'});
})

//redireccionar
app.get('/about-me', function (req, res) { //o function o =>
    res.redirect('/about');
})

app.post('/users/crear', function (req, res) {

    console.log(req.body);  // Verifica los datos recibidos
    
    const user = new User(req.body)

    user.save()
    .then((resultado) => {
        res.redirect('/')
    })
    .catch((error) => {
        console.error("Error al guardar el usuario:", error);
        res.status(500).send('Error al guardar el usuario');
    })

});


//404
app.use((req, res) =>{
    res.status(404).render('404', {title: 'error', stylesheet: '/estilo404.css'});
})

