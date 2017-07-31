const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const styles = require('./webpack/styles');
const uglify = require('./webpack/uglify');
const images = require('./webpack/images');
const html = require('./webpack/html');
const json = require('./webpack/json');
const babel = require('./webpack/babel');

const isDebug = true;//!process.argv.includes('--release');
const isChrome = true;//process.argv.includes('--chrome');
const isFirefox = false;//process.argv.includes('--firefox');

const DIRS = () => {
    if(isChrome) return {
        source: path.join(__dirname, 'src'),
        build: path.join(__dirname, 'build/chrome')
    };
    if(isFirefox) return {
        source: path.join(__dirname, 'src'),
        build: path.join(__dirname, 'build/firefox')
    };
};

const PATHS = {
    source: {
        directory: DIRS().source,
        background: path.join(DIRS.source, 'background'),
        popup: path.join(DIRS.source, 'popup'),
        content: path.join(DIRS.source, 'content'),
    },
    build: {
        directory: DIRS().build,
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
    images(),
    json(PATHS),
    babel()
]);

module.exports = function() {
    if (isDebug){
        return merge([
            common,
            styles(PATHS,isDebug)
        ]);
    }
    else{
        return merge([
            common,
            uglify(),
            styles(PATHS,false)
        ]);
    }
};
