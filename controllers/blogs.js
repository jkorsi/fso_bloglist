const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const blog = require('../models/blog')
//const {result} = require('lodash')

//-------------------------------
//----------- GET ALL -----------
//-------------------------------
blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

//-------------------------------
//---------- POST ONE -----------
//-------------------------------
blogsRouter.post('/', async (request, response, next) => {
    const blog = new Blog(request.body)
    
    try {
        const result = await blog.save()
        response.status(201).json(result)
    } catch(exception) {
        response.status(400)
        next(exception)
    }
})

//-------------------------------
//--------- DELETE ONE ----------
//-------------------------------
blogsRouter.delete('/:id', async (request, response, next) => {
    try
    {
        const removedBlog = await Blog.findByIdAndDelete(request.params.id)
        
        console.log(removedBlog)
        response.status(204).json(removedBlog)
    }
    catch (exception)
    {
        response.status(400)
        next(exception)
    }
})

//-------------------------------
//--------- UPDATE ONE ----------
//-------------------------------
blogsRouter.put('/:id', async (request, response, next) =>
{
    try{
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body)
        response.status(200).json(updatedBlog)
    }
    catch (exception){
        response.status(400)
        next(exception)
    }
})

module.exports = blogsRouter
