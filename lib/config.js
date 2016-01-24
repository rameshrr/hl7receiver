/**
 * Author  : Ramesh R
 * Created : 1/24/2016 10:12 AM
 * ----------------------------------------------------------------------
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE', which is part of this source code package.
 * ----------------------------------------------------------------------
 */

'use strict';

module.exports = {
    port: 1337,
    idleTimeout: 0,

    /// Default is '0' - unlimited
    maxConnections: 0,

    keepAlive: true,

    /// Emits received data, so one can log the received message
    emitRawMessage: true,

    /// To write received files
    backupChannel: 'FILE',
    backupDir: '',

    /// Default delimiter - File Separator - should be in HEX format
    messageDelimiterHex: '0x1C',
    encoding: 'utf8'
};