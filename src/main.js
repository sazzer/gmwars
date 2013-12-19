var Hapi = require("hapi"),
    handlers = require("./handlers");

var server = Hapi.createServer("0.0.0.0", parseInt(process.env.PORT, 10) || 8080, {
    views: {
        path: "templates",
        engines: {
            tmpl: "handlebars"
        }
    }
});
console.log("Started server on port " + server.info.port);

for (var i = 0; i < handlers.length; ++i) {
    console.log("Registering handler: " + handlers[i].path);
    server.route(handlers[i]);
}

server.start();
