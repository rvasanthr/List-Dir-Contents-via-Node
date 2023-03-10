#!/usr/bin/env node
// Project: To list the contents of current directory
// To use FileSystem from POSIX
// const { rejects } = require('assert');
const fs = require('fs');
// const { resolve } = require('path');
// Getting files from directory
fs.readdir(process.cwd(), async (error, fileNames) => {
    // readdir first argument is path
    // Callback Fn details below   
    // Takes Error, array of Files as arguments
    // Returns an Err object if something is wrong or null if all ok
    // second argument: array of string with the names of files in the path passed
    for (let fileName of fileNames) {
        // Processing errors if encountered for each async and await response
        try {
            const stats = await lstat(fileName);
            console.log(fileName, stats.isFile());
        } catch (error) {
            console.log(error);
        }
    }
});
// lstat and promise combo 1
const lstat = fileName => {
    return new Promise((resolve, reject) => {
        fs.lstat(fileName, (error, stats) => {
            if (error) reject(error);
            resolve(stats);
        });
    });
}