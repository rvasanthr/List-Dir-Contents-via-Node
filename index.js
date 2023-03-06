#!/usr/bin/env node
// Project: To list the contents of current directory
// To use FileSystem from POSIX
const fs = require('fs');
// Getting files from directory
fs.readdir(process.cwd(), (error, fileNames) => {
    // readdir first argument is path
    // Callback Fn details below   
    // Takes Error, Files as arguments
    // Returns an Err object if something is wrong or will return null if all ok
    // second argument: array of string with the names of files in the path passed
    if (error) {
        // if error object is defined, then Error handling code
        console.log(error);
        // return;
        // throw new Error(err);
    }
    // console.log(fileNames);
    // Out of order response approach
    for (let fileName of fileNames) {
        fs.lstat(fileName, (error, stats) => {
            if (error) {
                console.log(error);
            }
            console.log(fileName, stats.isFile());
        });
    }
});