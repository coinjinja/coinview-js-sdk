import bridge from './_bridge'

const coinview = {}

let _app = null
let _inited = false

coinview.init = function (appId) {
  if (_inited) {
    return new Promise(function (resolve, reject) {
      resolve(coinview)
    })
  }
  _inited = true
  return bridge.init({ appId }).then(data => {
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
