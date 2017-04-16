const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: __dirname + "/app/canvas.js",
    output: {
        path: __dirname + '/dist',
        filename: 'bundlecanvas.js'
    }
};
