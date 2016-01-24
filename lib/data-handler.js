/**
 * Author  : Ramesh R
 * Created : 1/24/2016 12:16 PM
 * ----------------------------------------------------------------------
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE', which is part of this source code package.
 * ----------------------------------------------------------------------
 */

'use strict';

var Reader = require('hl7js').Reader,
    utils = require('kalam'),

    async = require('async');


/// 10(0x0A) - LF, 11(0x0B) - VT, 13(0x0D) - CR
var charsIgnored = [10, 11, 13];

var DataHandler = function (options) {
    this.senderIp = options.senderIp;
    this.senderPort = options.senderPort;
    this.delimiterHex = options.delimiterHex;

    this.data = '';

    /// To track partial data between packets
    this.partialData = '';
};

DataHandler.prototype.processData = function (rawData, callback) {

    var delimiterKeyCode = parseInt(this.delimiterHex);
    var data = rawData.toString();

    var fileCompleted = false;

    while (true) {

        var lastChar = data.charCodeAt(data.length - 1);

        /// Checking file separator
        if (lastChar == delimiterKeyCode) {
            fileCompleted = true;
            break;
        }

        /// Checking for junk chars at the end
        if (charsIgnored.indexOf(lastChar) > -1) {
            data = data.substring(0, data.length - 1);
        } else {
            break;
        }
    }

    var hl7Delimiter = utils.hexToString(this.delimiterHex);
    var hl7Messages = data.split(hl7Delimiter).filter(function (msg) {
        return msg.length > 0;
    });

    /// Checking data for MSH or Starts with char 11(new message)
    if (data.charCodeAt(0) == 11 || data.indexOf('MSH') == 0) {

        /// Process any partial data and clean
        if (this.partialData) {
            hl7Messages.push(this.partialData);
        }

        this.partialData = '';

    } else {
        /// Copy the pending data in the biginning
        this.partialData += hl7Messages.shift();
    }

    if (!fileCompleted) {
        /// Copy the pending data in the end
        this.partialData += hl7Messages.pop();
    }

    if (hl7Messages.length > 0) {
        this.parseHl7Data(hl7Messages, callback);
    } else {
        callback(null, []);
    }
};

DataHandler.prototype.processPartialData = function (rawData) {
    /// Process partial data here
    if (this.partialData) {
        this.parseHl7Data([this.partialData]);
    }

    /// Clear partial data
    this.partialData = '';
};

DataHandler.prototype.parseHl7Data = function (hl7Messages, callback) {

    var reader = new Reader('BASIC');

    async.mapSeries(hl7Messages, function (message, asyncCb) {

        async.setImmediate(function () {

            if (message.charCodeAt(0) == 11) {
                message = message.substring(1, message.length);
            }

            reader.read(message, function (err, hl7Data) {
                asyncCb(err, hl7Data);
            });

        });
    }, function (err, results) {
        callback(err, results);
    });
};

module.exports = DataHandler;