var handlerFiles = ["./static", "./buildings", "./players"],
    handlers = [];

for (var i = 0; i < handlerFiles.length; ++i) {
    var definition = require(handlerFiles[i]);
    console.log("Loaded handlers from file " + handlerFiles[i]);
    handlers = handlers.concat(definition);
}
console.log("Loaded " + handlers.length + " handlers");

module.exports = handlers;
