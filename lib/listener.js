/**
 * Author  : Ramesh R
 * Created : 1/24/2016 10:08 AM
 * ----------------------------------------------------------------------
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE', which is part of this source code package.
 * ----------------------------------------------------------------------
 */

'use strict';

var net = require('net'),
    EventEmitter = require('events'),
    util = require('util'),

    Debug = require('debug'),
    async = require('async'),

    DataReader = require(__dirname + '/data-reader'),
    config = require(__dirname + '/config');

var debug = Debug('main');

var Listener = function (options) {
    this.options = options || config;
    this.dataReader = null;

    for (var key in config) {
        this.options[key] = this.options[key] || config[key];
    }

    this.port = this.options['port'];

    EventEmitter.call(this);
};

util.inherits(Listener, EventEmitter);

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
            listener.emit('info', 'connected');
        });

        socket.on('data', function (rawData) {

            if (listener.options.emitRawMessage) {
                process.nextTick(function () {
                    listener.emit('data', null, rawData);
                });
            }

            listener.dataReader.read(socket.remoteAddress, socket.remotePort, rawData, function (err, results) {

                if (!err && results.length > 0) {

                    async.eachSeries(results, function (result, asyncCb) {
                        async.setImmediate(function () {
                            listener.emit('hl7', null, result);
                            asyncCb();
                        });
                    }, function (err) {
                        if (err) {
                            listener.emit('error', err);
                        }
                    });
                } else {
                    listener.emit('warning', 'Partial or no data');
                }
            });
        });

        socket.on('close', function () {
            debug('Connection closed');
            listener.emit('info', 'close');
        });

        socket.on('drain', function () {
            debug('Connection drain');
            listener.emit('info', 'drain');
        });

        socket.on('error', function (err) {
            debug('Connection error', err || '');
            listener.emit('error', err || '');
        });

        socket.on('end', function () {
            debug('Connection ended');
            listener.emit('info', 'end');
        });

        socket.on('timeout', function () {
            debug('Connection timeout');
            listener.emit('info', 'timeout');
        });
    });

    server.on('close', function () {
        debug('Connection closed');
        listener.emit('info', 'close');
    });

    server.on('error', function (err) {
        debug('Connection error', err || '');
        listener.emit('error', err || '');
    });

    server.on('listening', function () {
        listener.dataReader = new DataReader(listener.options);

        debug('HL7 Receiver. Listening at: ', server.address().port);
        listener.emit('info', 'listening');
    });

    if (this.options.maxConnections) {
        server.maxConnections = listener.options.maxConnections;
    }

    server.listen(this.options.port);
};

module.exports = Listener;