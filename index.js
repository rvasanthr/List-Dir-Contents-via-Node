#!/usr/bin/env node
// including the posix filesystem
import { promises, readdir } from 'fs';
// Lstat using 3rd way
const { lstat } = promises;
// Using chalk
import chalk from 'chalk';
// Accessing path from node standard library
import path from 'path';
// Getting the target directory - if exists or else Current Working Directory
const targetDir = process.argv[2] || process.cwd();
// Getting files from directory
readdir(targetDir, async (error, fileNames) => {
    // Error Handling
    if (error) console.log(error);
    // Array to hold all lstat promise calls
    const statPromises = fileNames.map(fileName => (lstat((path.join(targetDir, fileName)))));
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