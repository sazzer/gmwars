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
            this._colours = {
                stroke: {
                    colour: "#FF0000",
                    opacity: 0.8,
                    weight: 2
                },
                fill: {
                    colour: "#FF0000",
                    opacity: 0.35
                }
            };
            if (options.radius) {
                // It's a circle
                this._position = this._convertToLatLng(options.position);
                this._radius = options.radius;

                this._region = new google.maps.Circle({
                    map: this._map.getRawMap(),
                    center: this._position,
                    radius: this._radius,
                    strokeColor: this._colours.stroke.colour,
                    strokeOpacity: this._colours.stroke.opacity,
                    strokeWeight: this._colours.stroke.weight,
                    fillColor: this._colours.fill.colour,
                    fillOpacity: this._colours.fill.opacity
                });
            } else if (options.topLeft && options.bottomRight) {
                // It's a rectangle
                this._topLeft = this._convertToLatLng(options.topLeft);
                this._bottomRight = this._convertToLatLng(options.bottomRight);

                this._region = new google.maps.Rectangle({
                    map: this._map.getRawMap(),
                    bounds: new google.maps.LatLngBounds(
                        this._topLeft,
                        this._bottomRight
                    ),
                    strokeColor: this._colours.stroke.colour,
                    strokeOpacity: this._colours.stroke.opacity,
                    strokeWeight: this._colours.stroke.weight,
                    fillColor: this._colours.fill.colour,
                    fillOpacity: this._colours.fill.opacity
                });
            }
        }
    });
});

