'use strict';

const NodeCache = require('node-cache');

function NodeCachePromiseAll() {
  const self = this;

  const cache = new NodeCache(...arguments);

  function wrap(func) {
    return function () {
      const args = Array.from(arguments);
      return new Promise(function(resolve, reject) {
        func(...args, function(error, result) {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
      });
    }
  }

  const functionsToWrap = [
    'set',
    'get',
    'mget',
    'del',
    'mdel',
    'ttl',
    'getTtl',
    'keys',
    'on'
  ];
  const nonWrappedFunctions = [
    'getStats',
    'flushAll',
    'close'
  ];

  functionsToWrap.forEach(functionName => {
    self[functionName] = wrap(cache[functionName]);
  });
  nonWrappedFunctions.forEach(functionName => {
    self[functionName] = cache[functionName];
  });

  return self;
}


module.exports = NodeCachePromiseAll;
