'use strict';

const DEBUG = false;

const args = process.argv;

let arg = '';

if (args.length !== 3 || args[2].indexOf('http:') > -1 || args[2].indexOf('https:') > -1) {
    console.log("Usage: node site_to_urls.js [website without protocol prefix]");
    console.log("i.e.:  node site_to_urls.js example.com");
    process.exit(0);
} else {
    arg = args[2];
}

const async = require('async');

const utils = require('./utils.js');
let position = 1;
let previousResults = [];
let currentResults = [];
let fullResults = [];
    
async.doUntil((cb) => {
    if (DEBUG) {
        console.log('first: ' + position);
        console.log('q: "site:' + arg + '"');
    }
    previousResults = currentResults;
    currentResults = [];
    previousResults.forEach((prev) => {
        let unique = true;
        fullResults.forEach((full) => {
            if (full === prev)
                unique = false;
        });
        if (unique)
            fullResults.push(prev);
    });
    
    utils.wait(utils.DELAY)
        .then(() => { return utils.scrape({ qs: { q: 'site:' + arg, first: position }, uri: 'https://www.bing.com/search' }) }) // download the page and convert it to a native-ish DOM
        .then((window) => {
            let info = Array.prototype.slice.call(window.document.querySelectorAll('.b_algo h2 a'));
            info.forEach((result) => {
                currentResults.push(result.href);
            });
            
            if (DEBUG) {
                console.log('Previous: ');
                console.log(previousResults);
                console.log('Current: ');
                console.log(currentResults);
                console.log('Full: ');
                console.log(fullResults);
                console.log('\n');
            }
            cb();
        })
        .catch((err) => { throw err; cb(err); });
        
}, () => {
    return JSON.stringify(previousResults.sort()) === JSON.stringify(currentResults.sort()); // javascript's array comparison sucks, so we convert it to json and compare the strings. also, bing likes to rearrange its search results for no reason whatsoever, so we gotta take that into account by sorting it before comparing
    
}, () => { if (DEBUG) console.log('Final results:'); console.log(fullResults.join('\n')); });