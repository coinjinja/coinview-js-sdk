import bridge from './_bridge'

const coinview = {}

let _app = null
let _inited = false

// (readonly) coinview.app
Object.defineProperty(coinview, 'app', {
  get () {
    return _app
  }
})

coinview.init = function (appId) {
  if (_inited) {
    return new Promise(function (resolve, reject) {
      let time = 0

      function _resolve () {
        if (_app) {
          resolve(coinview)
        } else if (time > 3000) {
          reject(new Error('Timeout'))
        } else {
          time += 10
          setTimeout(_resolve, 10)
        }
      }
      _resolve()
    })
  }
  _inited = true
  return bridge.init({ appId }).then(data => {
    _app = data
    return coinview
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
    if (!_app) {
      throw new Error('Please call after "coinview.init"')
    }
    return bridge.send(method, payload)
  }
}

export default coinview
