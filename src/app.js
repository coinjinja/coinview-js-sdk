import bridge from './_bridge'

const coinview = {}

let _app = null
let _inited = false

coinview.log = () => undefined

coinview.init = function (appId, debug, host) {
  if (_inited) {
    return new Promise(function (resolve, reject) {
      resolve(coinview)
    })
  }
  if (debug && host) {
    coinview.log = function (tag, ...args) {
      return bridge.send('console', { tag, args })
    }
    window.onerror = function(msg, url, line, col, error) {
      return bridge.send('error', {
        msg, url, line, col, error,
        stack: error.stack,
      })
    };
  }
  return bridge.init({ appId, debug, host }).then(data => {
    _inited = true
    _app = data
    return coinview
  })
}

coinview.app = function () {
  if (!_inited) {
    throw new Error('Please call after "coinview.init"')
  }
  return new Promise(function (resolve, reject) {
    function _resolve () {
      if (_app) {
        resolve(_app)
      } else {
        setTimeout(_resolve, 10)
      }
    }
    _resolve()
  })
}

export function register (method) {
  const names = method.split('.')
  const m = names[0]
  const f = names[1]
  if (!coinview[m]) {
    coinview[m] = {}
  }
  coinview[m][f] = function (payload) {
    if (!_inited) {
      throw new Error('Please call after "coinview.init"')
    }
    return bridge.send(method, payload)
  }
}

export default coinview
