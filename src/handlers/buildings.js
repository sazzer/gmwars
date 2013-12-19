var Hapi = require("hapi");

module.exports = [
    {
        method: "PUT",
        path: "/api/building",
        config: {
            handler: function(request) {
                var type = request.payload.type,
                    lat = request.payload.lat,
                    lng = request.payload.lng;
                console.log("Request to place building of type " + type + " at (" + lat + ", " + lng + ")");

                request.reply({type: type, lat: lat, lng: lng}).code(201);
            },
            validate: {
                payload: {
                    type: Hapi.types.String().required(),
                    lat: Hapi.types.String().required(),
                    lng: Hapi.types.String().required()
                }
            }
        }
    }
];
