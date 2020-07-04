const mongoose = require('mongoose')
const logger = require('../utils/logger')

//-------------------------------
//----------- SCHEMA ------------
//-------------------------------
const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

//const Blog = mongoose.model('Blog', blogSchema)
module.exports = mongoose.model('Blog', blogSchema)

//-------------------------------
//----------- CONFIG ------------
//-------------------------------
const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true})
logger.info('Connecting to: ', mongoUrl)


//-------------------------------
//---------- EXAMPLE ------------
//-------------------------------
// const mongoose = require('mongoose')
// const uniqueValidator = require('mongoose-unique-validator')
// mongoose.set('useFindAndModify', false)
// mongoose.set('useCreateIndex', true);
// const password = process.argv[2]

// // const url =
// //     `mongodb+srv://juho:${password}@hy-fullstack.gfdbm.mongodb.net/phonebook?retryWrites=true&w=majority`
// const url = process.env.MONGODB_URI
// console.log('connecting to', url)

// personSchema.plugin(uniqueValidator)

// personSchema.set('toJSON', {
//     transform: (document, person) =>
//     {
//         person.id = person._id.toString()
//         delete person._id
//         delete person.__v
//     }
// })

// //const Person = mongoose.model('Person', personSchema)

// module.exports = mongoose.model('Person', personSchema)