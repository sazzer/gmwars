/**
 * The representation of the current player.
 * This actually exists as a Promise because it gets loaded asynchronously when the page loads.
 */
define([
    "dojo/_base/declare",
    "dojo/Deferred"
    ], function(declare, Deferred) {
    var PlayerClass = declare("GMWars.game.Player", null, {
        /**
         * Construct the player
         */
        constructor: function(options) {
            this._name = options.name;
        },

        /**
         * Get the name of the player
         */
        getName: function() {
            return this._name;
        }
    });

    var playerPromise = new Deferred();
    var player = new PlayerClass({
        name: "sazzer"
    });
    playerPromise.resolve(player);

    return playerPromise;
});

