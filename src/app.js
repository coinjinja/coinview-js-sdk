import bridge from './_bridge'

const coinview = {}

let _app = null

// (readonly) coinview.app
Object.defineProperty(coinview, 'app', {
  get () {
    return _app
  }
})

coinview.init = function (payload) {
  return bridge.init(payload).then(data => {
    _app = data
    delete coinview.init
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
