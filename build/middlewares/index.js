'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

var _typeof = require('@babel/runtime/helpers/typeof')

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.auth = void 0
Object.defineProperty(exports, 'cacheFile', {
  enumerable: true,
  get: function get() {
    return _downloadFile['default']
  },
})
Object.defineProperty(exports, 'cacheFileMiddleware', {
  enumerable: true,
  get: function get() {
    return _uploadFile['default']
  },
})
Object.defineProperty(exports, 'updateLoginUser', {
  enumerable: true,
  get: function get() {
    return _updateLoginUser['default']
  },
})

var auth = _interopRequireWildcard(require('./auth'))

exports.auth = auth

var _uploadFile = _interopRequireDefault(require('./uploadFile'))

var _updateLoginUser = _interopRequireDefault(require('./updateLoginUser'))

var _downloadFile = _interopRequireDefault(require('./downloadFile'))

function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== 'function') return null
  var cacheBabelInterop = new WeakMap()
  var cacheNodeInterop = new WeakMap()
  return (_getRequireWildcardCache = function _getRequireWildcardCache(
    nodeInterop
  ) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop
  })(nodeInterop)
}

function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj
  }
  if (
    obj === null ||
    (_typeof(obj) !== 'object' && typeof obj !== 'function')
  ) {
    return { default: obj }
  }
  var cache = _getRequireWildcardCache(nodeInterop)
  if (cache && cache.has(obj)) {
    return cache.get(obj)
  }
  var newObj = {}
  var hasPropertyDescriptor =
    Object.defineProperty && Object.getOwnPropertyDescriptor
  for (var key in obj) {
    if (key !== 'default' && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor
        ? Object.getOwnPropertyDescriptor(obj, key)
        : null
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc)
      } else {
        newObj[key] = obj[key]
      }
    }
  }
  newObj['default'] = obj
  if (cache) {
    cache.set(obj, newObj)
  }
  return newObj
}
