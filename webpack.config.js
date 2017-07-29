const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const styles = require('./webpack/styles');
const uglifyJS = require('./webpack/uglify');
const images = require('./webpack/images');
const html = require('./webpack/html');

const DIRS = {
    source: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'build'),
};

const PATHS = {
    source: {
        background: path.join(DIRS.source, 'background'),
        popup: path.join(DIRS.source, 'popup'),
        content: path.join(DIRS.source, 'content'),
    },
    build: {
        background: path.join(DIRS.build, 'background'),
        popup: path.join(DIRS.build, 'popup'),
        content: path.join(DIRS.build, 'content'),
    }
};

const common = merge([
    {
        entry: {
            background: PATHS.source.background+'/index.js',
            popup: PATHS.source.popup+'/index.js',
            content: PATHS.source.content+ "/index.js"
        },
        output: {
            path: path.resolve(__dirname, "build"),
            filename: "[name]/index.js"
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                name: 'common'
            })
        ]
    },
    html(PATHS),
    styles(),
    images()
]);

module.exports = function(env) {
    if (env === 'chrome'){
        return merge([
            common,
            uglifyJS()
        ]);
    }
    if (env === 'firefox'){
        return merge([
            common
        ])
    }
};
