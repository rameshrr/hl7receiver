/**
 * Author  : Ramesh R
 * Created : 1/24/2016 10:44 AM
 * ----------------------------------------------------------------------
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE', which is part of this source code package.
 * ----------------------------------------------------------------------
 */

'use strict';

var Listener = require(__dirname + '/../');

var listener = new Listener({
    port: 1337
});

listener.createListener();