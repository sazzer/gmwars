/**
 * Module to represent the login dialog
 */
define([
    "dijit/Dialog",
    "dojo/i18n",
    "dojo/i18n!./nls/login"
], function(Dialog, i18n) {
    var strings = i18n.getLocalization("gmwars.view", "login", this.lang);
    return {
        /**
         * Display the login dialog
         */
        display: function() {
            console.log("Displaying the login dialog");
            var loginDialog = new Dialog({
                title: strings.dialogTitle,
                content: strings.dialogTitle,
                style: "width: 300px",
                closable: false
            });
            loginDialog.show();
        }
    };
});
