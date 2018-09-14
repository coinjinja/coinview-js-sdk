import uuidv4 from 'uuid/v4'
import { VERSION } from './_const'

const callbacks = {}

function _send (method, payload, cb) {
  const uuid = uuidv4()
  callbacks[uuid] = cb
  const data = {method, uuid}
  if (payload) {
    data.payload = payload
  }
  window.postMessage(JSON.stringify(data))
}

function send (method, payload) {
  let time = 0

  return new Promise(function (resolve, reject) {

    function cb (error, data) {
      if (error) {
        reject(error)
      } else {
        resolve(data)
      }
    }

    function _resolve () {
      if (window.originalPostMessage) {
        _send(method, payload, cb)
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

function receive (data) {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {}
  }

  if (data.uuid) {
    const cb = callbacks[data.uuid]
    if (cb) {
      cb(data.error, data.payload)
      delete callbacks[data.uuid]
    } else {
      console.warn('Unregistered callback:', data.uuid)
    }
  } else {
    console.error('Invalid data:', data)
  }
}

function init (payload) {
  window.document.addEventListener('message', (e) => {
    const { data } = e
    receive(data)
  })

  payload['$version'] = VERSION
  payload['$url'] = location.href
  return send('app.init', payload)
}

export default {
  send,
  receive,
  init
}
