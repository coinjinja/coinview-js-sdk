"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _v = _interopRequireDefault(require("uuid/v4"));

var _const = require("./_const");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var callbacks = {};

function _send(method, payload, cb) {
  var uuid = (0, _v.default)();
  callbacks[uuid] = cb;
  var data = {
    method: method,
    uuid: uuid
  };

  if (payload) {
    data.payload = payload;
  }

  window.postMessage(JSON.stringify(data));
}

function send(method, payload) {
  return new Promise(function (resolve, reject) {
    function cb(error, data) {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    }

    function sending() {
      if (window.originalPostMessage) {
        _send(method, payload, cb);
      } else {
        setTimeout(sending, 10);
      }
    }

    sending();
  });
}

function receive(data) {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data);
    } catch (e) {
      return console.error('Invalid data:', data);
    }
  }

  if (data.uuid) {
    var cb = callbacks[data.uuid];

    if (cb) {
      cb(data.error, data.payload);
      delete callbacks[data.uuid];
    } else {
      console.warn('Unregistered callback:', data.uuid);
    }
  } else {
    console.error('Invalid data:', data);
  }
}

function init() {
  var payload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  window.document.addEventListener('message', function (e) {
    var data = e.data;
    receive(data);
  });
  payload['$version'] = _const.VERSION;
  payload['$url'] = location.href;
  return send('app.init', payload);
}

var _default = {
  send: send,
  receive: receive,
  init: init
};
exports.default = _default;