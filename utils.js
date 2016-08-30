'use strict';

const extend = require('deep-extend');
const jsdom = require('jsdom').env;
const request = require('request');

module.exports = { scrape: function(opts) {
    let reqOpts = {
        headers: {
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36'
        },
        gzip: true
    };
    
    switch (typeof opts) {
        case 'string':
            reqOpts = extend(reqOpts, { uri: opts });
        break;
        case 'object':
            reqOpts = extend(reqOpts, opts);
        break;
    }
    
    return new Promise((resolve, reject) => {
        request(reqOpts, (reqErr, reqRes, reqBody) => {
            if (reqErr !== null)
                reject(reqErr);
            else
                jsdom({
                    html: reqBody,
                    done: (parseErr, window) => {
                        if (parseErr !== null)
                            reject(parseErr);
                        else
                            resolve(window);
                    }
                });
        });
    });
}, wait: function(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}, DELAY: 1250 };