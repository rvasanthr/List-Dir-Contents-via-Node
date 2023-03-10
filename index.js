#!/usr/bin/env node
// including the posix filesystem
import { promises, readdir } from 'fs';
// Lstat using 3rd way
const { lstat } = promises;
// Using chalk
import chalk from 'chalk';
// Getting files from directory
readdir(process.cwd(), async (error, fileNames) => {
    // Error Handling
    if (error) console.log(error);
    // Array to hold all lstat promise calls
    const statPromises = fileNames.map(fileName => (lstat(fileName)));
    // Invoking all promises simultaneously (saves time)
    const allStats = await Promise.all(statPromises);
    // Looping over the stats and displaying the files
    for (let i = 0; i < fileNames.length; i++) {
        // If file
        if (allStats[i].isFile()) {
            console.log((fileNames[i]));
        }
        // If folder
        if (allStats[i].isDirectory()) {
            console.log(chalk.inverse(fileNames[i]));
        }
    }
});