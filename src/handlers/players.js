var Hapi = require("hapi");

module.exports = [
    {
        method: "GET",
        path: "/api/player/regions",
        config: {
            handler: function(request) {
                request.reply([
                    {
                        state: "enemy",
                        topLeft: {lat: 40.69311788, lng: -73.97354}, 
                        bottomRight: {lat: 40.68719, lng: -73.96264}
                    },
                    {
                        state: "enemy",
                        topLeft: {lat: 40.66311788, lng: -73.96354}, 
                        bottomRight: {lat: 40.64719, lng: -73.95264}
                    },
                    {
                        state: "enemy",
                        topLeft: {lat: 40.62311788, lng: -73.99354}, 
                        bottomRight: {lat: 40.61719, lng: -73.98264}
                    },
                    {
                        state: "enemy",
                        topLeft: {lat: 40.63311788, lng: -73.98354}, 
                        bottomRight: {lat: 40.61719, lng: -73.96564}
                    },
                    {
                        state: "friend",
                        topLeft: {lat: 40.72311788, lng: -73.99354}, 
                        bottomRight: {lat: 40.71719, lng: -73.95264}
                    }
                ]);
            }
        }
    }, {
        method: "GET",
        path: "/api/player",
        config: {
            handler: function(request) {
                request.reply({
                    id: "P12345",
                    name: "sazzer",
                    buildings: [
                        {
                            id: "B12345",
                            type: "HQ",
                            name: "Headquarters",
                            lat: 40.72624515100551,
                            lng: -74.00474846363068
                        }
                    ]
                });
            }
        }
    }
];

