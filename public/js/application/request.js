/**
 * Wrapper around an AJAX Request of some kind
 */
define([
    "dojo/_base/declare",
    "dojo/request"
    ], function(declare, request) {
    return declare("GMWars.application.Request", null, {
        /**
         * Construct the request
         */
        constructor: function(options) {
            this._url = options.url;
            this._method = options.method || "GET";
        },

        /**
         * Set the payload data on the request
         */
        setData: function(data) {
            this._data = data;
        },

        /**
         * Actually make the request happen
         */
        go: function() {
            var headers = {
                "X-GMWars": "true",
            };

            if (dojoConfig.application.authToken) {
                headers["Authorization"] = "GMWars " + dojoConfig.application.authToken;
            }

            return request(this._url, {
                data: this._data,
                headers: headers,
                method: this._method,
                timeout: 5000,
                handleAs: "json"
            });
        }
    });
});


