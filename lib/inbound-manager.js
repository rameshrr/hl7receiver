/**
 * Author  : Ramesh R
 * Created : 1/24/2016 12:23 PM
 * ----------------------------------------------------------------------
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE', which is part of this source code package.
 * ----------------------------------------------------------------------
 */

'use strict';

var EventEmitter = require('events'),
    util = require('util'),

    Listener = require(__dirname + '/listener');

var InboundManager = function () {

    this.configuration = [];
    this.listeners = [];

    this.initialize = function (receiveConfig) {

        if (!receiveConfig) {
            receiveConfig = {};
        }

        if (typeof receiveConfig === 'object') {
            this.configuration.push(receiveConfig);
        }

        if (receiveConfig.constructor.name === 'Array') {
            this.configuration = receiveConfig;
        }

        var inboundManager = this;

        for (var i = 0; i < this.configuration.length; i++) {
            var listener = new Listener(this.configuration[i]);
            listener.createListener();

            listener.on('hl7', function (err, message) {
                inboundManager.emit('hl7', err, message);
            });

            listener.on('data', function (err, rawData) {
                inboundManager.emit('data', err, rawData);
            });

            listener.on('info', function (info) {
                inboundManager.emit('info', info);
            });

            listener.on('warning', function (warning) {
                inboundManager.emit('warning', warning);
            });

            listener.on('error', function (err) {
                inboundManager.emit('error', err);
            });

            this.listeners.push(listener);
        }
    };

    this.closeAll = function () {
    };

    EventEmitter.call(this);
};

util.inherits(InboundManager, EventEmitter);
module.exports = InboundManager;