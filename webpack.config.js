const path = require("path");

module.exports = {
    entry: {
        background: "./src/background/index.js",
        popup: "./src/popup/index.js"
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "[name]/index.js"
    }
};
