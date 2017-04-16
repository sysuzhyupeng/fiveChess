const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: __dirname + "/app/Dom.js",
    output: {
        path: __dirname + '/dist',
        filename: 'bundleDom.js'
    }
};
