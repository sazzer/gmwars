/**
 * Base class with some helper functions
 */
define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/domReady!"], function(declare, lang) {
    return declare("GMWars.google.maps.Base", null, {
        /**
         * Helper to convert an input to a LatLng object. The input can be one of a number
         * of things that all get translated correctly
         * @param coords The object to translate
         * @return the google.maps.LatLng object
         */
        _convertToLatLng: function(coords) {
            var result;
            if (lang.isObject(coords)) {
                if (lang.exists("lat", coords) && lang.exists("lng", coords)) {
                    result = new google.maps.LatLng(coords.lat, coords.lng);
                }
            }
            return result;
        }
    });
});



