const fs = require("fs");
const path = require("path");

module.exports = (app) => {
    fs
    .readdirSync(__dirname)
    .filter((files) =>!files.startsWith("index"))
    .forEach((route) =>{
        require(path.resolve(__dirname,route))(app)
    });
};
