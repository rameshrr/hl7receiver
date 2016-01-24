/**
 * Author  : Ramesh R
 * Created : 1/24/2016 1:00 PM
 * ----------------------------------------------------------------------
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE', which is part of this source code package.
 * ----------------------------------------------------------------------
 */

'use strict';

var DataHandler = require(__dirname + '/data-handler');

var DataReader = function (options) {
    this.dataHandlers = {};
    this.encoding = options.encoding;

    this.messageDelimiterHex = options.messageDelimiterHex;
};

DataReader.prototype.read = function (senderIp, senderPort, data) {

    if (!data) {
        return;
    }

    if (data && data.match(/^\s*$/)) {
        return;
    }

    var senderId = senderIp + '_' + senderPort;

    if (!this.dataHandlers[senderId]) {
        this.dataHandlers[senderId] = new DataHandler({
            senderIp: senderIp,
            senderPort: senderPort,
            delimiterHex: this.messageDelimiterHex
        });
    }

    this.dataHandlers[senderId].processData(data);
};

module.exports = DataReader;