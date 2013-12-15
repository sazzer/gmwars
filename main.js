var Hapi = require("hapi");

var server = Hapi.createServer("0.0.0.0", 8080);

server.route({
    method: "GET",
    path: "/{path*}",
    handler: {
        directory: {
            path: "./public",
            listing: false,
            index: false
        }
    }
});

server.start();
