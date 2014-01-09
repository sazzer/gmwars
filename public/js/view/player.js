/**
 * UI View that represents the help window
 */
define([
    "dojo/_base/declare",
    "dojo/i18n",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/dom-style",
    "gmwars/game/player",
    "dojo/text!./templates/player.tmpl",
    "dojo/i18n!./nls/player",
    "dojo/domReady!"
    ], function(declare, i18n, _WidgetBase, _TemplatedMixin, domStyle, player, template) {
    var PlayerClass = declare("GMWars.view.Player", [_WidgetBase, _TemplatedMixin], {
        templateString: template,
        /**
         * Handler after properties are mixed in but before the widget is rendered.
         * Set the messages to the i18n strings that have been loaded
         * @method postMixInProperties
         * @protected
         */
        postMixInProperties: function() {
          this.inherited(arguments);
          this.strings = i18n.getLocalization("gmwars.view", "player", this.lang);
        },
        /**
         * Ensure that when the widget is first created it gets the players details added to it
         */
        postCreate: function() {
            player.then(dojo.hitch(this, this._renderPlayerDetails), dojo.hitch(this, function() {
                // If we fail to get the player, hide the player window
                domStyle.set(this.domNode, "display", "none");
            }));
        },

        /**
         * Actually render the player details into the widget
         * @param player the player to render
         */
        _renderPlayerDetails: function(player) {
            this._playerNameNode.innerHTML = player.getName();
        },

        /**
         * Get the raw element that represents the help window
         */
        getRawElement: function() {
            return this.domNode;
        }
    });

    return new PlayerClass();
});
