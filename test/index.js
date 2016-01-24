/**
 * Author  : Ramesh R
 * Created : 1/24/2016 10:44 AM
 * ----------------------------------------------------------------------
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE', which is part of this source code package.
 * ----------------------------------------------------------------------
 */

'use strict';

var Receiver = require(__dirname + '/../');

var receiver = new Receiver();

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


receiver.on('hl7', function (err, hl7Message) {
    //console.log(err);
    //console.log(hl7Message);

    if (!err) {
        /// Reading patient name
        console.log('Patient name: ', hl7Message.segments[1][5]);
    }
});

receiver.on('data', function (err, rawData) {
    console.log(rawData);
});