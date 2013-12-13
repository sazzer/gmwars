/**
 * UI View that represents the help window
 */
define([
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/dom-construct",
    "dojo/dom-style",
    "dojo/text!./templates/help.tmpl",
    "dojo/domReady!"
    ], function(declare, _WidgetBase, _TemplatedMixin, domConstruct, domStyle, template) {
    var HelpClass = declare("GMWars.view.Help", [_WidgetBase, _TemplatedMixin], {
        templateString: template,
        /**
         * Get the raw element that represents the help window
         */
        getRawElement: function() {
            return this.domNode;
        },
        /**
         * Hide the help window
         */
        hideHelp: function() {
            domStyle.set(this.domNode, "display", "none");
        },

        /**
         * Show the help window with the given markup in it
         */
        showHelp: function(help) {
            var helpContents = domConstruct.toDom(help);
            domConstruct.place(helpContents, this.domNode, "only");
            domStyle.set(this.domNode, "display", "block");
        },
    });

    return new HelpClass();
});


