/**
 * The representation of the current player.
 * This actually exists as a Promise because it gets loaded asynchronously when the page loads.
 */
define([
    "dojo/_base/declare",
    "dojo/Deferred",
    "gmwars/application/request"
    ], function(declare, Deferred, Request) {
    var PlayerClass = declare("GMWars.game.Player", null, {
        /**
         * Construct the player
         */
        constructor: function(options) {
            this._id = options.id;
            this._name = options.name;
            this._buildings = options.buildings;
        },

        /**
         * Get the name of the player
         */
        getName: function() {
            return this._name;
        },
        /**
         * Get the details of all of the players buildings
         */
        getBuildings: function() {
            return this._buildings;
        },
        /**
         * Get the buildings of a given type
         * @param type The type of building to get
         */
        getBuildingsOfType: function(type) {
            return this._buildings.filter(function(b) {
                return b.type == type;
            });
        }
    });

    var playerPromise = new Deferred();
    var req = new Request({
        url: "/api/player"
    });
    req.go().then(function(response) {
        var player = new PlayerClass(response);
        playerPromise.resolve(player);
    }, function(error) {
        console.log("Failed to load player details");
    });

    return playerPromise;
});

