const express = require('express')
const app = new express()
const mongoose = require('mongoose')
const ejs = require('ejs')
const fileUpload = require('express-fileupload') 

const customMiddleWare = require("./middleware/customMiddleware")
const validateMiddleWare = require("./middleware/validateMiddleware")
const homeController = require('./controllers/home')
const newPostController = require('./controllers/newPost')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')

app.set('view engine', 'ejs')

mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true})
mongoose.set('strictQuery', false)

app.use(customMiddleWare)
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded())
app.use(fileUpload())
app.use('/post/store',validateMiddleWare)

app.listen(4000, ()=>{
	console.log('App listening on port 4000')
})

app.get('/',homeController)
app.get('/post/new', newPostController)
app.get('/post/:id', getPostController)
app.post('/post/store', storePostController)
