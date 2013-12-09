/**
 * The representation of a marker on the map
 */
define([
    "dojo/_base/declare",
    "gmwars/google/maps/base",
    "gmwars/google/maps/map"
    ], function(declare, MapsBase, Map) {
    return declare("GMWars.google.maps.Marker", MapsBase, {
        /**
         * Construct the marker
         */
        constructor: function(options) {
            this._map = options.map;
            this._position = this._convertToLatLng(options.position);
            this._name = options.name || "Marker";

            this._marker = new google.maps.Marker({
                map: this._map.getRawMap(),
                position: this._position,
                title: this._name
            });
        }
    });
});
