const express = require('express')
const app = new express()
const mongoose = require('mongoose')
const ejs = require('ejs')
const fileUpload = require('express-fileupload') 
const expressSession = require('express-session') 

const customMiddleWare = require("./middleware/customMiddleware")
const validateMiddleWare = require("./middleware/validateMiddleware")
const homeController = require('./controllers/home')
const newUserController = require('./controllers/newUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const storeUserController = require('./controllers/storeUser')
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
app.use(expressSession({
    secret: 'keyboard cat'
}))
app.use(fileUpload())
app.use('/post/store',validateMiddleWare)

app.listen(4000, ()=>{
	console.log('App listening on port 4000')
})

app.get('/',homeController)
app.get('/auth/register', newUserController)
app.get('/auth/login', loginController)
app.get('/post/new', newPostController)
app.get('/post/:id', getPostController)
app.post('/users/register', storeUserController)
app.post('/users/login', loginUserController)
app.post('/post/store', storePostController)
