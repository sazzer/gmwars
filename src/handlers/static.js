module.exports = [
    {
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
    },
    {
        method: "GET",
        path: "/public/{path*}",
        handler: {
            directory: {
                path: "./public",
                listing: false,
                index: false
            }
        }
    }
];
