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
    const blog = new Blog({ title: 'new blog', 
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
}   
);


app.get('/', (req, res) => {
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
      ];
    res.render('index', { title: 'Home', blogs });
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
