const express = require('express');
const path = require('path');
const app = express();
const port = 3040;
const http = require('http');

// Serve static files from the given directory
function serve(directory) {
    (async () => {
        app.use(express.static(directory));
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    })()
    
}

// Check if the server is already running
function isServing() {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 3040,
            path: '/',
            method: 'GET'
        };

        const req = http.request(options, (res) => {
            if (res.statusCode === 200) {
                resolve(true); // Service is running
            } else {
                resolve(false); // Service is not running
            }
        });

        req.on('error', () => {
            resolve(false); // Service is not running or not accessible
        });

        req.end();
    });
}

function close() {
    // app.close()
}

module.exports = { serve, isServing, close };
