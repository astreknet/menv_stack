const express = require('express')
const path = require('path')
const app = new express()
const ejs = require('ejs')
app.set('view engine', 'ejs')

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true})
mongoose.set('strictQuery', false)

const BlogPost = require('./models/BlogPost.js')

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded())



app.listen(4000, ()=>{
	console.log('App listening on port 4000')
})

app.get('/', (req,res)=>{
    res.render('index')
})

app.get('/about', (req,res)=>{
    res.render('about')
})

app.get('/contact', (req,res)=>{
    res.render('contact')
})

app.get('/post', (req,res)=>{
    res.render('post')
})

app.get('/post/new', (req,res)=>{
    res.render('create')
})

app.post('/post/store', async (req,res)=>{
    // model creates a new doc with browser data
    console.log(req.body)
	await BlogPost.create(req.body,(error,blogpost) =>{
	    res.redirect('/')
	})    
})
