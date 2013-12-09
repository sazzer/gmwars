var ZOOM_OUT_LEVEL = 4,
    ZOOM_RATE = 10,
    PAN_RATE = 50,
    ZOOM_INTERVAL = 250;

/**
 * The representation of the Map on the screen
 */
define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "gmwars/google/maps/base",
    "dojo/domReady!"], function(declare, lang, MapsBase) {
    var MapClass = declare("GMWars.google.maps.Map", MapsBase, {
        constructor: function() {
            this._center = this._convertToLatLng({lat: 0.0, lng: 0.0});
            this._zoom = 10;

            this._map = new google.maps.Map(document.getElementById("map"), {
                center: this._center,
                zoom: this._zoom,
                mapTypeId: google.maps.MapTypeId.SATELLITE
            });
            console.log("Created a map");
        },

        /**
         * Get the raw Map object
         */
        getRawMap: function() {
            return this._map;
        },

        /**
         * Adjust the map display to target the given coordinates at the given zoom level. This will happen over a short period of time
         * to give the impression that the map is panning and zooming to the location
         */
        zoomTo: function(coords, zoom) {
            var latLng = this._convertToLatLng(coords),
                targetLat = latLng.lat(),
                targetLng = latLng.lng(),
                targetZoom = zoom || this._zoom,
                centerLat = this._center.lat(),
                centerLng = this._center.lng(),
                latRate = (targetLat - centerLat) / PAN_RATE,
                lngRate = (targetLng - centerLng) / PAN_RATE,
                zoomOutRate = (ZOOM_OUT_LEVEL - this._zoom) / ZOOM_RATE,
                zoomInRate = (targetZoom - ZOOM_OUT_LEVEL) / ZOOM_RATE,
                currentLat = centerLat,
                currentLng = centerLng,
                currentZoom = this._zoom,
                zoomTargets = [];

            for (var i = 0; i < ZOOM_RATE; ++i) {
                currentZoom += zoomOutRate;

                zoomTargets.push({
                    zoom: currentZoom
                });
            }

            for (var i = 0; i < PAN_RATE; ++i) {
                currentLat += latRate;
                currentLng += lngRate;
                zoomTargets.push({
                    lat: currentLat,
                    lng: currentLng
                });
            }

            for (var i = 0; i < ZOOM_RATE; ++i) {
                currentZoom += zoomInRate;

                zoomTargets.push({
                    zoom: currentZoom
                });
            }

            zoomTargets.push({
                    lat: targetLat,
                    lng: targetLng,
                    zoom: targetZoom
            });

            this._zoomTargets = zoomTargets;

            if (!this._zoomInterval) {
                this._zoomInterval = setInterval(dojo.hitch(this, this._zoomToHandler), ZOOM_INTERVAL);
            }
        },

        /**
         * Interval handler to update the map display for the latest target for zooming.
         */
        _zoomToHandler: function() {
            if (this._zoomTargets && this._zoomTargets.length > 0) {
                var nextTarget = this._zoomTargets.shift();
                var latLng = this._convertToLatLng(nextTarget);
                if (latLng) {
                    this._center = latLng;
                    this._map.panTo(latLng);
                }

                if (nextTarget.zoom) {
                    var zoom = Math.round(nextTarget.zoom);
                    if (zoom != this._zoom) {
                        this._zoom = zoom;
                        this._map.setZoom(zoom);
                    }
                }
            } else {
                clearInterval(this._zoomInterval);
            }
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


