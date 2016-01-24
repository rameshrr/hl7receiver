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
    maxConnections:0,

    keepAlive: true,

    encoding: 'utf8'
};