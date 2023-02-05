module.exports = (req,res)=>{
    const blogpost = BlogPost.findById(req.params.id)
    res.render('post',{
        blogpost
    })
}
