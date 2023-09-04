const fs = require('fs');

const readStream = fs.createReadStream('./docs/blog3.txt', { encoding: 'utf8' });   
const writeStream = fs.createWriteStream('./docs/blog4.txt');

/*
readStream.on('data', (chunk) => {    // chunk is a buffer
    console.log('----- NEW CHUNK -----');
    console.log(chunk);
    writeStream.write('\nNEW CHUNK\n');
    writeStream.write(chunk);
});
*/

readStream.pipe(writeStream);   // does the same thing as the above code    /
// readStream is the source, writeStream is the destination 

