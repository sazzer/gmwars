/**
 * Module to represent the login dialog
 */
define([
    "dijit/Dialog",
    "dojo/on",
    "dojo/i18n",
    "dojo/i18n!./nls/login"
], function(Dialog, on, i18n) {
    var strings = i18n.getLocalization("gmwars.view", "login", this.lang);
    return {
        /**
         * Display the login dialog
         */
        display: function() {
            console.log("Displaying the login dialog");
            var content = [
                "<a href='#' class='loginLink' rel='google'>",
                    "Log in with Google",
                "</a>"
            ].join("");
            var loginDialog = new Dialog({
                title: strings.dialogTitle,
                style: "width: 300px",
                closable: false
            });
            loginDialog.set("content", content);

            on(dojo.query(".loginLink", loginDialog.get("containerNode")), "click", function(evt) {
                evt.preventDefault();

                var provider = evt.currentTarget.getAttribute("rel");
                console.log("Logging in with " + provider);
                return false;
            });
            loginDialog.show();
        }
    };
});
