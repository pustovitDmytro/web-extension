const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const styles = require('./webpack/styles');
const uglifyJS = require('./webpack/uglify');
const images = require('./webpack/images');

const PATHS = {
    source: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'build')
};

const common = merge([
    {
        entry: {
            background: "./src/background/index.js",
            popup: "./src/popup/index.js",
            content: "./src/content/index.js"
        },
        output: {
            path: path.resolve(__dirname, "build"),
            filename: "[name].js"
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: PATHS.build + '/popup/index.html',
                template: PATHS.source + '/popup/index.html',
                chunks: ["popup"]
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'common'
            })
        ]
    },
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
