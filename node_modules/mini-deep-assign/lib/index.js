/**
 * Created by alykoshin on 22.01.16.
 */

'use strict';

/**
 * Node 0.10-0.12 does not supports Object.assign()
 *
 * Source below is based upon
 * https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill
 */


/**
 * @param {object} target - target object
 * @param {object} source - source object
 * @returns {object}
 */
var _assign = function(target, source) {
  //console.log('_assign(): source[nextKey]:', source[nextKey], '; target[nextKey]:', target[nextKey]);

  for (var nextKey in source) {
    if (source.hasOwnProperty(nextKey)) {
      var s = source[nextKey];
      if (
        typeof s === 'undefined' ||
        typeof s === 'boolean' ||
        typeof s === 'number' ||
        typeof s === 'string' ||
        s === null
      ) {
        //console.log('scalar: nextKey:', nextKey, '; source[nextKey]:', source[nextKey], '; target[nextKey]:', target[nextKey]);
        target[nextKey] = s;

      } else if (typeof s === 'function') {
        target[nextKey] = s;

      } else if (s instanceof Date) {
        target[nextKey] = new Date(s.getTime());

      } else if (s instanceof RegExp) {
        target[nextKey] = new RegExp(s);

      } else if (Array.isArray(s)) {
        //console.log('array: nextKey:', nextKey, '; source[nextKey]:', source[nextKey], '; target[nextKey]:', target[nextKey]);
        var arr = s.slice();
        var i = arr.length;
        while (i--){
          //arr[i] = _assign(arr[i], s[i]);
          arr[i] = ( _assign({ value: arr[i] }, { value: s[i] }) ).value; // workaround: pass by reference
        }
        target[nextKey] = arr;

      } else if (typeof s === 'object') {
        if (typeof target[nextKey] !== 'object') { // If target has no such key or it is non-object
          target[nextKey] = {};                    // Replace it with empty object
        }

        //for (var nextKey in source) {
        //  if (source.hasOwnProperty(nextKey)) {
        //var s = source[ nextKey ];
        _assign(target[ nextKey ], source[ nextKey ]);
        //}
        //}

      } else { // unknown type....
        throw new Error('Assignment error, nextKey: '+nextKey+', typeof source[ nextKey ]: '+(typeof source[ nextKey ]));
      }
    }
  }
  return target;

};



/** @param {object} target - target object, followed by list of source objects
 * @returns {object}
 */
var assign = function (target /* sources */) {
  //console.log('assign:', arguments);

  if (target === undefined || target === null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }
  //var output = Object(target);
  var output = { value: target }; // workaround: pass by reference

  for (var index = 1; index < arguments.length; index++) {
    var source = arguments[index];
    if (source !== undefined && source !== null) {
      var input = { value: source }; // workaround: pass by reference
      output = _assign(output, input);

    }
  }

  return output.value;
};


module.exports = assign;

