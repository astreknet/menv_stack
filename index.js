const express = require('express')
const path = require('path')
const app = new express()
const mongoose = require('mongoose')
const ejs = require('ejs')
const BlogPost = require('./models/BlogPost.js')
const fileUpload = require('express-fileupload') 

const customMiddleWare = (req,res,next)=>{
	console.log('Custom middle ware called')
	next()
	}
const validateMiddleWare = (req,res,next)=>{    
	if(req.files == null || req.body.title == null){        
	    return res.redirect('/post/new')
	}    
	next()
}
const newPostController = require('./controllers/newPost')

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

app.get('/', async (req,res)=>{
	const blogposts = await BlogPost.find({})
	res.render('index',{
        blogposts
	});
    console.log(blogposts)
})


app.get('/post/new', newPostController)

app.get('/post/:id', async (req,res)=>{
    const blogpost = await BlogPost.findById(req.params.id)
    res.render('post',{
        blogpost
    })
})

app.post('/post/store', async (req,res)=>{
    let image = req.files.image;  
	image.mv(path.resolve(__dirname,'public/img',image.name),async (error)=>{
        console.log(req.body)
	    await BlogPost.create({
            ...req.body,
            image: '/img/' + image.name
        })
	    res.redirect('/')
    })
})
