const del = require("del");

// Configuration
const path = require("../config/path.js")

// Delete result folder
const clear = () => {
    return del(path.root);
}

module.exports = clear;