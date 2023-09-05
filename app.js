const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');


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
app.use((req, res, next) => {   // this is a middleware function
    res.locals.path = req.path; // this is a local variable that we can use in our templates    
    next(); // next is a function that we call when we are done with the middleware 
}   
);


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


// blog routes, scope routes out
app.use('/blogs', blogRoutes);


// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' }                   
    );
} 
);
