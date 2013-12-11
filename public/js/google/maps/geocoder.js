/**
 * The ability to look up place details by location
 */
define([
    "dojo/_base/declare",
    "dojo/_base/array",
    "dojo/Deferred",
    "gmwars/google/maps/base",
    ], function(declare, array, Deferred, MapsBase) {
    var GeocoderClass = declare("GMWars.google.maps.GeoCoder", MapsBase, {
        /**
         * Construct the marker
         */
        constructor: function() {
            this._geocoder = new google.maps.Geocoder();
        },

        /**
         * Look up the details of the provided co-ordinates
         */
        lookup: function(coords) {
            var deferred = new Deferred();
            this._geocoder.geocode({
                    latLng: this._convertToLatLng(coords)
                }, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        deferred.resolve(array.map(results, function(item) {
                            return {
                                address: {
                                    formatted: item["formatted_address"],
                                    components: item["address_components"]
                                },
                                types: item["types"],
                                position: {
                                    lat: item.geometry.location.lat(),
                                    lng: item.geometry.location.lng(),
                                    type: item.geometry["location_type"]
                                }
                            }
                        }));
                    }
                    else {
                        deferred.cancel(status);
                    }
                });
            return deferred;
        }
    });

    try {
        var geocoder = new GeocoderClass();
        return geocoder;
    } catch (e) {
        console.log(e);
        return null;
    }

});


