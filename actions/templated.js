var path = require("path"),
    fs = require("fs"),
    combyne = require("combyne"),
    Streamifier = require("streamifier");

var action = {};

/////////////////////////////////////////////////////////////////////
// metadata
action.name = "templated";
action.description = "Displays a templated page";
action.inputs = {
  "required" : [],
  "optional" : []
};
action.blockedConnectionTypes = [];
action.outputExample = {
  status: "OK"
}

function send(server, data, connection) {
    var outputStream = Streamifier.createReadStream(data);

    server.sendFile(connection._original_connection, 
        null, 
        outputStream,
        "text/html",
        data.length);
}

/////////////////////////////////////////////////////////////////////
// functional
action.run = function(api, connection, next){
    var server = api.servers.servers[connection.type];
    try {
        var _file = connection.params.file || "index.html",
            file = _file.split(".")[0] + ".tmpl",
            key = path.normalize(api.configData.general.paths.templates + "/" + file);

        if (api.templates[key]) {
            send(server, api.templates[key], connection);
        } else {
            api.log("Compiling template " + key);
            fs.stat(key, function(err, stats) {
                if (err) {
                    connection.error = err;
                    next(connection, true);
                } else {
                    if (stats.isFile()) {
                        fs.readFile(key, {
                            encoding: "UTF-8",
                            }, function(err, data) {
                            if (err) {
                                connection.error = err;
                                next(connection, true);
                            } else {
                                var template = combyne(data);
                                api.templates[key] = template.render(api.configData);
                                send(server, api.templates[key], connection);
                            }
                        });
                    } else {
                        connection.error = "Template file not found: " + key;
                        next(connection, true);
                    }
                }
            });
        }
    } catch (e) {
        api.log(e);
        connection.error = "Your connection type, '" + connection.type + "', cannot be sent files'";
        next(connection, true);
    }
};

/////////////////////////////////////////////////////////////////////
// exports
exports.action = action;

