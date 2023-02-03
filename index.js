const express = require('express')
const path = require('path')
const app = new express()
const ejs = require('ejs')
app.set('view engine', 'ejs')

//const mongoose = require('mongoose')
//mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true}

app.use(express.static('public'))

app.listen(4000, ()=>{
	console.log('App listening on port 4000')
})

app.get('/', (req,res)=>{
    res.render('index')
})

app.get('/about', (req,res)=>{
    res.render('about')
//    res.sendFile(path.resolve(__dirname, 'pages/about.html'))
})

app.get('/contact', (req,res)=>{
    res.render('contact')
//    res.sendFile(path.resolve(__dirname, 'pages/contact.html'))
})

app.get('/post', (req,res)=>{
    res.render('post')
//    res.sendFile(path.resolve(__dirname, 'pages/post.html'))
})

