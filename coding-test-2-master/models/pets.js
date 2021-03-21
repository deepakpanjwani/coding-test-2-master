const mongoose = require('mongoose')

const Schema = mongoose.Schema
const PetsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    colour: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Pets', PetsSchema)