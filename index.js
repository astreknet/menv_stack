const express = require('express')
const app = express()
const path = require('path')
app.use(express.static('public'))
app.listen(3000, ()=>{
    console.log("app listening on port 3000")
})

app.get('/json',(req,res)=>{
    res.json({
	    name: 'El Hugo'
	})
})

app.get('/',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'index.html'))
})

app.get('/about',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'about.html'))
})

app.get('/contact',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'contact.html'))
})


