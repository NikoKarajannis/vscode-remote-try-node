const http = require('http');
const fs = require('fs');
const _ = require('lodash');



const server = http.createServer((req, res) => {
    // lodash
    const num = _.random(0, 20);
    console.log(num);
    
    const greet = _.once(() => {    
        console.log('Hello');
    });

    greet();
    greet();    

    // set header content type
    res.setHeader('Content-Type', 'text/html ');

    let path = './views/';
    switch(req.url) {   // switch statement
        case '/':    // if the url is /, then send the index.html file
            path += 'index.html';   // path = ./views/index.html
            res.statusCode = 200;   // set status code to 200
            break;
        case '/about':   // if the url is /about, then send the about.html file         
            path += 'about.html';   // path = ./views/about.html
            res.statusCode = 200;   // set status code to 200  
            break;
        case '/about-blah':   // if the url is /about-me, then redirect to /about 
            res.statusCode = 301;   // set status code to 301
            res.setHeader('Location', '/about');   // set header location to /about 
            res.end();   // end the response
            break;
        default:   // if the url is not / or /about, then send the 404.html file    
            path += '404.html';   // path = ./views/404.html
            res.statusCode = 404;   // set status code to 404
            break;
    }

    // send an html file
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        } else {
            res.write(data);
            res.end();
        }
        });  
});

server.listen(3000, 'localhost', () => {
    console.log('Listening for requests on port 3000');
});
