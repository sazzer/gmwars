var regionColours = {
    "self": "#0000ff",
    "enemy": "#ff0000",
    "friend": "#00ff00"
};

/**
 * UI View that represents the player regions
 */
define([
    "dojo/_base/declare",
    "gmwars/application/request",
    "gmwars/google/maps/map",
    "gmwars/google/maps/region",
    ], function(declare, Request, map, Region) {
    var PlayerRegionsClass = declare("GMWars.view.PlayerRegions", [], {
        constructor: function() {
            this._regions = [];
            this.update();
            // Update the regions once a minute
            setInterval(dojo.hitch(this, this.update), 60000);
        },

        /**
         * Update the regions that are displayed to match those from the server
         */
        update: function() {
            for (var i = 0; i < this._regions.length; ++i) {
                this._regions[i].destroy();
            }
            this._regions = [];

            var req = new Request({url: "/api/player/regions"});
            req.go().then(dojo.hitch(this, function(regions) {
                for (var i = 0; i < regions.length; ++i) {
                    var region = new Region({
                        map: map,
                        colour: regionColours[regions[i].state],
                        topLeft: regions[i].topLeft,
                        bottomRight: regions[i].bottomRight
                    });
                    this._regions.push(region);
                }
            }), function(error) {
                console.log("Failed to get player regions");
            });
        }
    });

    return new PlayerRegionsClass();
});

