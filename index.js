#!/usr/bin/env node
// including the posix filesystem
const fs = require('fs');
// Lstat using 3rd way
const { lstat } = fs.promises;
// Using chalk
const chalk = require('chalk');
// Getting files from directory
fs.readdir(process.cwd(), async (error, fileNames) => {
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
});