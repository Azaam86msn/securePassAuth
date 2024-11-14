const express = require('express');
const helmet = require('helmet'); // Import helmet
const app = express();

// Use Helmet for setting various HTTP headers for security
app.use(helmet());

// Enable specific security headers provided by Helmet
app.use(helmet.contentSecurityPolicy());       // Helps prevent cross-site scripting (XSS) attacks
app.use(helmet.dnsPrefetchControl());          // Controls DNS prefetching
app.use(helmet.expectCt());                    // Enforces Certificate Transparency
app.use(helmet.frameguard({ action: 'deny' })); // Prevents clickjacking
app.use(helmet.hidePoweredBy());               // Removes the X-Powered-By header
app.use(helmet.hsts());                        // Adds Strict-Transport-Security header
app.use(helmet.ieNoOpen());                    // Prevents IE from executing downloads
app.use(helmet.noSniff());                     // Prevents browsers from MIME-type sniffing
app.use(helmet.permittedCrossDomainPolicies()); // Prevents Adobe Flash and Acrobat from loading content
app.use(helmet.referrerPolicy({ policy: 'no-referrer' })); // Controls referrer information
app.use(helmet.xssFilter());                   // Adds some small XSS protections
// Set HSTS (HTTP Strict Transport Security) to enforce HTTPS for at least 1 year
app.use(
  helmet.hsts({
    maxAge: 31536000, // 1 year in seconds
    includeSubDomains: true, // Applies HSTS to all subdomains
    preload: true, // Allows domain to be preloaded by browsers that support it
  })
);
app.use(helmet.noCache());      // Disable client-side caching with noCache

const api = require('./server.js');
app.use(express.static('public'));
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});

module.exports = app;
