// Project: To list the contents of current directory
// To use FileSystem from POSIX
const fs = require('fs');
// Getting files from directory
fs.readdir('.', (error, fileNames) => {
    // Takes Error, Files as arguments
    // Returns an Err object if something is wrong or will return null if all ok
    // second argument: array of string with the names of files in the path passed
    if (error) {
        // if error object is defined, then Error handling code
        console.log(error);
        // return;
        // throw new Error(err);
    }
    console.log(fileNames);
});