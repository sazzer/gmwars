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
    "dojo/dom-construct",
    "dojo/dom-style",
    "dojo/_base/window",
    "gmwars/google/maps/base",
    "dojo/domReady!"], function(declare, lang, domConstruct, domStyle, win, MapsBase) {
    var MapClass = declare("GMWars.google.maps.Map", MapsBase, {
        constructor: function() {
            var mapElem = domConstruct.create("div", {
                    id: "map"
                }, 
                win.body());
            var searchElem = domConstruct.create("input", {
                    type: "text",
                    id: "pac-input",
                    className: "controls",
                    placeholder: "Search the map"
                }, 
                win.body());

            this._helpWindowDiv = domConstruct.create("div", {
                    id: "help-window"
                }, 
                win.body());

            this._center = this._convertToLatLng({lat: 0.0, lng: 0.0});
            this._zoom = 10;

            this._map = new google.maps.Map(mapElem, {
                center: this._center,
                zoom: this._zoom,
                mapTypeId: google.maps.MapTypeId.SATELLITE,

            });

            this._map.controls[google.maps.ControlPosition.TOP_LEFT].push(searchElem);
            this._map.controls[google.maps.ControlPosition.TOP_RIGHT].push(this._helpWindowDiv);

            this._searchBox = new google.maps.places.SearchBox(searchElem);
            
            google.maps.event.addListener(this._searchBox, "places_changed", dojo.hitch(this, this._onSearchBoxPlacesChanged));

            this.hideHelp();
            console.log("Created a map");
        },

        /**
         * Hide the help window
         */
        hideHelp: function() {
            domStyle.set(this._helpWindowDiv, "display", "none");
        },

        /**
         * Show the help window with the given markup in it
         */
        showHelp: function(help) {
            var helpContents = domConstruct.toDom(help);
            domConstruct.place(helpContents, this._helpWindowDiv, "only");
            domStyle.set(this._helpWindowDiv, "display", "block");
        },

        /**
         * Handle when the search box has a place name selected
         */
        _onSearchBoxPlacesChanged: function() {
            var places = this._searchBox.getPlaces();

            if (places && places.length > 0) {
                var place = places[0];

                this._map.panTo(place.geometry.location);
                this._map.fitBounds(place.geometry.viewport);
            }
        },

        /**
         * Get the raw Map object
         */
        getRawMap: function() {
            return this._map;
        },

        /**
         * Go directly to a given position on the map.
         */
        goTo: function(coords, zoom) {
            var latLng = this._convertToLatLng(coords);
            if (latLng) {
                this._map.panTo(latLng);
            }
            if (zoom) {
                this._map.setZoom(zoom);
            }
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


