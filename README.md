# Nodejs Bing Scripts

A collection of node.js scripts for scraping Bing.

## ```site_to_caches.js```

This script is similar to ```site_to_urls.js``` but instead returns the cached links for results (if available).

#### Usage

```
Usage: node site_to_caches.js [website without protocol prefix]
i.e.:  node site_to_caches.js example.com
```

## ```site_to_urls.js```

This script will try and get as many URLs for a given website as it can.

#### Usage

```
Usage: node site_to_urls.js [website without protocol prefix]
i.e.:  node site_to_urls.js example.com
```

## ```url_to_cache.js```

This script will try and find a cached link for a URL

#### Usage

```
Usage: node url_to_cache.js [url, with or without protocol prefix]
i.e.:  node url_to_cache.js http://example.com
```
