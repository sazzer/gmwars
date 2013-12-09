/**
 * The representation of a marker on the map
 */
define([
    "dojo/_base/declare",
    "gmwars/google/maps/base",
    "gmwars/google/maps/map"
    ], function(declare, MapsBase, Map) {
    return declare("GMWars.google.maps.Region", MapsBase, {
        /**
         * Construct the marker
         */
        constructor: function(options) {
            this._map = options.map;
            this._position = this._convertToLatLng(options.position);
            this._radius = options.radius;

            this._regiou = new google.maps.Circle({
                map: this._map.getRawMap(),
                center: this._position,
                radius: this._radius
            });
        }
    });
});

