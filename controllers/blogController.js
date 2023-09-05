const Blog = require('../models/blog');


//blog_index, blog_details, blog_create_get, blog_create_post, blog_delete


const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1 }) // find all blogs and sort them by createdAt in descending order
        .then((result) => { // then do something with the result
            res.render('blogs/index', { title: 'All blogs', blogs: result });   // send the result to the browser
        })
        .catch((err) => {   // if there is an error
            console.log(err);   // log the error to the console
        });
};


const blog_details = (req, res) => {
    const id = req.params.id;   // get the id from the url
    Blog.findById(id) // find the blog by id
        .then((result) => { // then do something with the result
            res.render('blogs/details', { blog: result, title: 'Blog Details' });   // send the result to the browser
        })
        .catch((err) => {   // if there is an error
            console.log(err);   // log the error to the console
            res.render('404', { title: 'Blog not found' });   // send the result to the browser 
        });
};


const blog_create_get = (req, res) => {
    res.render('blogs/create', { title: 'Create a new blog' });       
};


const blog_create_post = (req, res) => {
    const blog = new Blog(req.body);   // create a new blog, only possible to urlencoded middleware
    
    blog.save() // save the blog to the database
        .then((result) => { // then do something with the result
            res.redirect('/blogs');   // redirect to the blogs page 
        })
        .catch((err) => {   // if there is an error
            console.log(err);   // log the error to the console
        });
};


const blog_delete = (req, res) => {
    const id = req.params.id;   // get the id from the url
    
    Blog.findByIdAndDelete(id) // find the blog by id and delete it 
        .then((result) => { // then do something with the result    
            res.json({ redirect: '/blogs' });   // send the result to the browser
        })
        .catch((err) => {   // if there is an error
            console.log(err);   // log the error to the console
        });
};


module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
};
