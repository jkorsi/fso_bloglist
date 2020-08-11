const mongoose = require('mongoose')
//const logger = require('../utils/logger')

//-------------------------------
//----------- SCHEMA ------------
//-------------------------------
const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    likes:{
        type: Number,
        default: 0
    }
})

//-------------------------------
//----------- _ID -> ID ---------
//-------------------------------
blogSchema.set('toJSON', {
    transform: (document, returnedObject) =>
    {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Blog', blogSchema)