/**
 * Author  : Ramesh R
 * Created : 1/24/2016 12:16 PM
 * ----------------------------------------------------------------------
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE', which is part of this source code package.
 * ----------------------------------------------------------------------
 */

'use strict';

var DataHandler = function () {
    this.data = '';
};

DataHandler.prototype.readData = function (data) {
    this.data += data;
    console.log(this.data);
};

DataHandler.prototype.processData = function () {

};

module.exports = DataHandler;