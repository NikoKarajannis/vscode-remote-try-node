const fs = require('fs');

// read files
fs.readFile('./docs/blog1.txt', (err, data) => {
    if (err) {
        console.log(err);
    }
    console.log(data.toString());
}   );


console.log('last line');


// writing files
fs.writeFile('./docs/blog1.txt', 'hello, world', () => {
    console.log('file was written');
}   );


fs.writeFile('./docs/blog2.txt', 'hello, again', () => {
    console.log('file was written');
}   );



// directories
if (!fs.existsSync('./assets')) {    // checks if the folder exists  
fs.mkdir('./assets', (err) => {
    if (err) {
        console.log(err);
    }
    console.log('folder created');
}   );  // creates a folder called assets
} else {
    fs.rmdir('./assets', (err) => {
        if (err) {
            console.log(err);
        }
        console.log('folder deleted');
    }   );
}   // deletes the folder called assets


// delete files
if (fs.existsSync('./docs/delete_me.txt')) {
    fs.unlink('./docs/delete_me.txt', (err) => {
        if (err) {
            console.log(err);
        }
        console.log('file deleted');
    }   );
}   // deletes the file called delete_me.txt in the docs folder      // checks if the file exists                        
