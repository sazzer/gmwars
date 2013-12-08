/**
 * The representation of the Map on the screen
 */
define([
    "dojo/_base/declare",
    "dojo/domReady!"], function(declare) {
    var MapClass = declare("GMWars.google.maps.Map", null, {
        constructor: function() {
            this._center = new google.maps.LatLng(0.0, 0.0);
            this._zoom = 4;

            this._map = new google.maps.Map(document.getElementById("map"), {
                center: this._center,
                zoom: this._zoom,
                mapTypeId: google.maps.MapTypeId.SATELLITE
            });
            console.log("Created a map");
        }
    });

    try {
        var map = new MapClass();
        return map;
    } catch (e) {
        console.log(e);
        return null;
    }
});


