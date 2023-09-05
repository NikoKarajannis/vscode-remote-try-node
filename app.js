const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

// express app
const app = express();


// connect to mongodb & listen for requests
const dbURI = 'mongodb+srv://Roland:hr3ZyHCGp1m8qZB0@blogs.xf6spwi.mongodb.net/';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));


// register view engine
app.set('view engine', 'ejs');
//app.set('views', 'myviews');   // default is views, but we can change it to templates or something else       


// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

/*
app.use((req, res, next) => {
    console.log('new request made:');
    console.log('host: ', req.hostname);
    console.log('path: ', req.path);
    console.log('method: ', req.method);
    next();
}
);
*/


app.get('/add-blog', (req, res) => {
    const blog = new Blog({ 
        title: 'new blog 3', 
        snippet: 'about my new blog', 
        body: 'more about my new blog'  
    });
    blog.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});


app.get('/all-blogs', (req, res) => {
    Blog.find() // find all blogs
        .then((result) => { // then do something with the result
            res.send(result);   // send the result to the browser
        })  
        .catch((err) => {   // if there is an error
            console.log(err);   // log the error to the console
        });
});


app.get('/single-blog', (req, res) => {
    Blog.findById('64f6de813b1c519bd06ea495') // find a single blog by id
        .then((result) => { // then do something with the result
            res.send(result);   // send the result to the browser
        })
        .catch((err) => {   // if there is an error
            console.log(err);   // log the error to the console
        });
});


app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {    
    res.render('about', { title: 'About' });
}
);

// redirects
app.get('/about-blah', (req, res) => {
    res.redirect('/about');
}    
);

//blog routes
app.get('/blogs', (req, res) => {   
    Blog.find().sort({ createdAt: -1 }) // find all blogs and sort them by createdAt in descending order
        .then((result) => { // then do something with the result
            res.render('index', { title: 'All blogs', blogs: result });   // send the result to the browser
        })
        .catch((err) => {   // if there is an error
            console.log(err);   // log the error to the console
        });
}
);

app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);   // create a new blog, only possible to urlencoded middleware
    
    blog.save() // save the blog to the database
        .then((result) => { // then do something with the result
            res.redirect('/blogs');   // redirect to the blogs page 
        })
        .catch((err) => {   // if there is an error
            console.log(err);   // log the error to the console
        });
}
);

// blog
app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' });       
}          
);


// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' }                   
    );
} 
);
