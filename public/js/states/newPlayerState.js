/**
 * State that is active when the player is brand new and hasn't done anything yet
 */
define([
    "dojo/_base/declare",
    "dojo/_base/array",
    "dojo/i18n",
    "dijit/Dialog",
    "dojo/on",
    "gmwars/application/request",
    "gmwars/game/player",
    "gmwars/view/help",
    "gmwars/google/maps/geocoder",
    "dojo/i18n!./nls/newPlayerState"
    ], function(declare, array, i18n, Dialog, on, Request, player, helpWindow, geocoder) {
    return declare("GMWars.states.NewPlayerState", null, {
        /**
         * Construct the state
         */
        constructor: function() {
            this.strings = i18n.getLocalization("gmwars.states", "newPlayerState", "");
            helpWindow.showHelp(this.strings.welcome);
        },

        /**
         * Handle when the user has clicked on the map somewhere
         */
        onClickMap: function(position) {
            var lat = position.lat,
                lng = position.lng;

            var hqDialog = new Dialog({
                title: this.strings.placeHeadquartersTitle,
                style: "width: 300px"
            });

            geocoder.lookup(position).then(dojo.hitch(this, function(value) {
                var buildingAddresses = array.filter(value, function(v) {
                    return v.position.type == "ROOFTOP";
                });
                if (buildingAddresses.length > 0) {
                    var content = [
                        "<div>",
                            "<span>" + this.strings.validBuilding.replace("{address}", value[0].address.formatted) + "</span>",
                            "<div class='dijitDialogPaneActionBar'>",
                                "<button class='okButton'>" + this.strings.validBuildingOk + "</button>",
                                "<button class='cancelButton'>" + this.strings.validBuildingCancel + "</button>",
                            "</div>",
                        "</div>"
                    ].join("");
                    hqDialog.set("content", content);
                    
                    on(dojo.query(".okButton", hqDialog.get("containerNode")), "click", function(evt) {
                        var req = new Request({url: "/api/building", method: "PUT"});
                        req.setData({
                            type: "HQ",
                            lat: lat,
                            lng: lng
                        });
                        req.go().then(function(response) {
                            console.log("HQ Created");
                            hqDialog.destroyRecursive();
                        }, function(error) {
                            console.log("HQ Not Created: " + error);
                            hqDialog.destroyRecursive();
                        });
                    });
                    on(dojo.query(".cancelButton", hqDialog.get("containerNode")), "click", function(evt) {
                        hqDialog.destroyRecursive();
                    });
                } else {
                    hqDialog.set("content", this.strings.invalidBuilding);
                }
                hqDialog.show();
            
            }), dojo.hitch(this, function(error) {
                hqDialog.set("content", this.strings.invalidBuilding);
                hqDialog.show();
            }));
        }
    });
});
