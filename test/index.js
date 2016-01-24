/**
 * Author  : Ramesh R
 * Created : 1/24/2016 10:44 AM
 * ----------------------------------------------------------------------
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE', which is part of this source code package.
 * ----------------------------------------------------------------------
 */

'use strict';

var receiver = require(__dirname + '/../');

/// Option 1
//receiver.initialize();


/// Option 2
receiver.initialize({
    port: 1337
});


/// Option 3
//receiver.initialize([{
//    port: 1337
//}, {
//    port: 1338
//}]);