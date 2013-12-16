var Hapi = require("hapi");

var server = Hapi.createServer("0.0.0.0", 8080, {
    views: {
        path: "templates",
        engines: {
            tmpl: "handlebars"
        }
    }
});

server.route({
    method: "GET",
    path: "/",
    config: {
        handler: function(req) {
            req.reply.view("index.tmpl", {
                application: {
                    google: {
                        apiKey: "AIzaSyAn3uaZKOP11QjkkrYCiQ-57KKqNR4WXOg"
                    }
                }
            });
        }
    }
});
server.route({
    method: "GET",
    path: "/public/{path*}",
    handler: {
        directory: {
            path: "./public",
            listing: false,
            index: false
        }
    }
});

server.start();
