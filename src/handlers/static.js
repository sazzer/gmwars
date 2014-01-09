module.exports = [
    {
        method: "GET",
        path: "/",
        config: {
            handler: function(req) {
                var authCookie = req.state["auth"];
                // Should actually use this as a key into a store, instead of a bare token
                var authToken = authCookie;

                req.reply.view("index.tmpl", {
                    application: {
                        authToken: authToken,
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
