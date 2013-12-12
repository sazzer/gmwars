/**
 * UI View that represents the help window
 */
define([
    "dojo/_base/declare",
    "dojo/dom-construct",
    "dojo/dom-style",
    "dojo/_base/window",
    "dojo/domReady!"
    ], function(declare, domConstruct, domStyle, win) {
    var HelpClass = declare("GMWars.view.Help", null, {
        /**
         * Construct the window
         */
        constructor: function() {
            this._helpWindowDiv = domConstruct.create("div", {
                    id: "help-window"
                }, 
                win.body());

            this.hideHelp();
        },
        /**
         * Get the raw element that represents the help window
         */
        getRawElement: function() {
            return this._helpWindowDiv;
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
    });

    return new HelpClass();
});


