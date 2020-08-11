const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./testHelper')
const blog = require('../models/blog')

const api = supertest(app)
const initialBlogs = helper.initialBlogs

//-------------------------------
//---- INITIALIZE TEST BLOGS ----
//-------------------------------
beforeEach(async () => {
    await Blog.deleteMany({})
    await blog.insertMany(initialBlogs)
    // let blogToAdd
    // for (var i = 0, len = initialBlogs.length; i < len; i++){
    //     blogToAdd = new Blog(initialBlogs[i])
    //     await blogToAdd.save()
    // }
})

test('get content type is correct', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('amount of blogs is correct', async () =>
{
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
})

test('add a valid blog', async () => {
    const newBlog = {
        title: 'New Blog',
        author: 'New Blogger',
        url: 'www.newblog.com',
        likes: 123
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)
    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(titles).toContainEqual('New Blog')
})

test('id is defined', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body
    let blogToTest
    for (var i = 0, len = blogs.length; i < len; i++){
        blogToTest = blogs[i]
        expect(blogToTest.id).toBeDefined()
    }
})

test('likes are defaulted to 0 if not set', async () =>
{
    await Blog.deleteMany({})

    const newBlog = {
        title: 'Hated Blog',
        author: 'Annoying Blogger',
        url: 'www.annoyingblog.com',
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body[0].likes).toBe(0)
})

test('field title is required', async () =>
{
    await Blog.deleteMany({})

    const newBlog = {
        author: 'Annoying Blogger',
        url: 'www.annoyingblog.com',
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
        //.expect('Content-Type', /application\/json/)
})

test('field url is required', async () =>
{
    await Blog.deleteMany({})

    const newBlog = {
        title: 'Hated Blog',
        author: 'Annoying Blogger',
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
    //.expect('Content-Type', /application\/json/)
})

test('delete one blog', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body
    const blogToDelete = blogs[0]
    const idOfDeleted = blogToDelete.id
    await api
        .delete('/api/blogs/' + idOfDeleted)
        .expect(204)
})

test.only('add one like (modify one blog)', async () =>
{
    const response = await api.get('/api/blogs')
    const blogs = response.body
    const blogToUpdate = blogs[0]

    const originaId = blogToUpdate.id

    const likedBlog = {
        id: blogToUpdate.id,
        title: blogToUpdate.title,
        author: blogToUpdate.author,
        url: blogToUpdate.url,
        likes: blogToUpdate.likes + 1
    }

    const updatedBlog = await api
        .put('/api/blogs/' + originaId)
        .send(likedBlog)
        .expect(200)
    console.log(updatedBlog)

    const res = await api.get('/api/blogs')
    expect(res.body[0].likes).toBe(blogToUpdate.likes + 1)
})


afterAll(async () =>
{
    await mongoose.connection.close()
})