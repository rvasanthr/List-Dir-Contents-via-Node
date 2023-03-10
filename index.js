#!/usr/bin/env node
// Project: To list the contents of current directory
// To use FileSystem from POSIX
// const { rejects } = require('assert');
const fs = require('fs');
// const util = require('util');
// const { resolve } = require('path');
// Using inbuilt lstat via util, combo 2
// const lstat = util.promisify(fs.lstat);
// Lstat using 3rd way
const { lstat } = fs.promises;
// Getting files from directory
fs.readdir(process.cwd(), async (error, fileNames) => {
    // readdir first argument is path
    // Callback Fn details below   
    // Takes Error, array of Files as arguments
    // Returns an Err object if something is wrong or null if all ok
    // second argument: array of string with the names of files in the path passed
    // Error Handling
    if (error) console.log(error);
    // Array to hold all lstat promise calls
    const statPromises = fileNames.map(fileName => (lstat(fileName)));
    // Invoking all promises simultaneously (saves time)
    const allStats = await Promise.all(statPromises);
    // Looping over the stats and displaying the files
    for (let i = 0; i < fileNames.length; i++) {
        console.log(fileNames[i], allStats[i].isFile());
    }
    // for (let fileName of fileNames) {
    //     // Processing errors if encountered for each async and await response
    //     try {
    //         const stats = await lstat(fileName);
    //         console.log(fileName, stats.isFile());
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
});
// lstat and promise combo 1
// const lstat = fileName => {
//     return new Promise((resolve, reject) => {
//         fs.lstat(fileName, (error, stats) => {
//             if (error) reject(error);
//             resolve(stats);
//         });
//     });
// }