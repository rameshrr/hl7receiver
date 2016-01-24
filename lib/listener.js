/**
 * Author  : Ramesh R
 * Created : 1/24/2016 10:08 AM
 * ----------------------------------------------------------------------
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE', which is part of this source code package.
 * ----------------------------------------------------------------------
 */

'use strict';

var sys = require('sys'),
    net = require('net'),

    Debug = require('debug'),

    config = require(__dirname + '/config');

var debug = Debug('main');

var Listener = function (options) {
    this.options = options || config;

    for (var key in config) {
        this.options[key] = this.options[key] || config[key];
    }
};

Listener.prototype.createListener = function () {

    var listener = this;

    var server = net.createServer(function (socket) {

        socket.setEncoding(listener.options.encoding);

        if (listener.options.keepAlive) {
            socket.setKeepAlive(true, 0);
        }

        if (listener.options.idleTimeout) {
            socket.setTimeout(listener.options.idleTimeout, function () {
                socket.end('Timeout fired');
            });
        }

        socket.on('connect', function () {
            debug('Connected. IP: ', socket.remoteAddress, socket.remotePort);
        });

        socket.on('data', function (data) {
            debug('Connection - receiving data', data);
        });

        socket.on('close', function () {
            debug('Connection closed');
        });

        socket.on('drain', function () {
            debug('Connection drain');
        });

        socket.on('error', function (err) {
            debug('Connection error', err || '');
        });

        socket.on('end', function () {
            debug('Connection ended');
        });

        socket.on('timeout', function () {
            debug('Connection timeout');
        });
    });

    server.on('close', function () {
        debug('Connection closed');
    });

    server.on('error', function (err) {
        debug('Connection error', err || '');
    });

    server.on('listening', function () {
        debug('HL7 Receiver. Listening at: ', server.address().port);
    });

    if (this.options.maxConnections) {
        server.maxConnections = listener.options.maxConnections;
    }

    server.listen(this.options.port);
};

module.exports = Listener;