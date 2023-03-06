#!/usr/bin/env node
// Project: To list the contents of current directory
// To use FileSystem from POSIX
const fs = require('fs');
// Getting files from directory
fs.readdir(process.cwd(), (error, fileNames) => {
    // readdir first argument is path
    // Callback Fn details below   
    // Takes Error, array of Files as arguments
    // Returns an Err object if something is wrong or null if all ok
    // second argument: array of string with the names of files in the path passed
    if (error) {
        // if error object is defined, then Error handling code
        console.log(error);
        // return;
        // throw new Error(err);
    }
    // fs.lstat and array combo
    const allStats = Array(fileNames.length).fill(null);
    for (let fileName of fileNames) {
        // Files are unique, so, no issues (here)
        const index = fileNames.indexOf(fileName);
        fs.lstat(fileName, (error, stats) => {
            if (error) {
                console.log(error);
            }
            allStats[index] = stats;
            // ready returns true if all items in the array are not null
            const ready = allStats.every(stats => stats);
            if (ready) {
                allStats.forEach((stats, index) => {
                    // Output of nls command to user
                    console.log(fileNames[index], stats.isFile());
                });
            }
        });
    }
});