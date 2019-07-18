const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const perrito = new Schema({
    perritoName: String,
    tamaño: String,
    sexo: String,
    edad: String,
    ingreso: String,
    image: {
        default: '',
        type: String
    }
})
const Perrito = mongoose.model('Perrito',perrito); // crea una coleccion de perritos con el esquema
module.exports = {Perrito}
