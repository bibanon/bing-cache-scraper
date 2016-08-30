'use strict';

const args = process.argv;

let arg = '';

if (args.length === 3) {
    if (args[2].indexOf('http:') > -1 || args[2].indexOf('https:') > -1)
        arg = args[2];
    else
        arg = 'http://' + args[2];
} else {
    console.log("Usage: node url_to_cache.js [url, with or without protocol prefix]");
    console.log("i.e.:  node url_to_cache.js http://example.com");
    process.exit(0);
}

const utils = require('./utils.js');
const url = require('url');

let parsed = url.parse(arg);

utils.scrape({ qs: { q: arg }, uri: 'https://www.bing.com/search' }) // download the page and convert it to a native-ish DOM
    .then((window) => {
        let info = Array.prototype.slice.call(window.document.querySelectorAll('.b_algo h2 a, .b_algo .b_attribution')); // 
        for (var i = 0; i < info.length; i++) {
            let res = url.parse(info[i].href);
            if (parsed.host === res.host && parsed.path === res.path) {
                i++;
                let cacheAttr = info[i].getAttribute('u');
                if (cacheAttr !== null) {
                    let cacheParams = info[i].getAttribute('u').split('|');;
                    console.log('http://cc.bingj.com/cache.aspx?d=' + cacheParams[2] + '&mkt=en-US&setlang=en-US&w=' + cacheParams[3]);
                    break;
                }
            }
            else {
                i++;
            }
        }
    })
    .catch((err) => { throw err; });