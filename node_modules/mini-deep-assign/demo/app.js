/**
 * Created by alykoshin on 31.01.16.
 */

'use strict';


var deepAssign = require('..');

var assign = require('mini-assign');

var obj1v1 = {
  r1: {
    p1: 'p1',
    p2: { p21:'p21' },
    p3: { p31: { p311: 'p311' } },
    p4: [1,2]
  }
};

var obj2v1 = {
  r1: {
    p1: { p11: 'p11' },
    p2: { p22: 'p22' },
    p3: { p31: { p312: 'p312' } },
    p4: [3,4]
  }
};

var obj1v2 = deepAssign({}, obj1v1);
var obj2v2 = deepAssign({}, obj2v1);


console.log('assign():',     JSON.stringify(assign(obj1v1, obj2v1),    null, 2));
console.log('deepAssign():', JSON.stringify(deepAssign(obj1v2, obj2v2), null, 2));

