/**
 * Author  : Ramesh R
 * Created : 1/24/2016 12:23 PM
 * ----------------------------------------------------------------------
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE', which is part of this source code package.
 * ----------------------------------------------------------------------
 */

'use strict';

var Listener = require(__dirname + '/listener');

var inboundManager = {

    configuration: [],
    listeners: [],

    initialize: function (receiveConfig) {

        if (!receiveConfig) {
            receiveConfig = {};
        }

        if (typeof receiveConfig === 'object') {
            this.configuration.push(receiveConfig);
        }

        if (receiveConfig.constructor.name === 'Array') {
            this.configuration = receiveConfig;
        }

        for (var i = 0; i < this.configuration.length; i++) {
            var listener = new Listener(this.configuration[i]);
            listener.createListener();

            this.listeners.push(listener);
        }
    },

    closeAll: function () {

    }
};

module.exports = inboundManager;