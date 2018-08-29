"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = register;
exports.default = void 0;

var _bridge = _interopRequireDefault(require("./_bridge"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var coinview = {};
var _app = null; // (readonly) coinview.app

Object.defineProperty(coinview, 'app', {
  get: function get() {
    return _app;
  }
});

coinview.init = function (payload) {
  return _bridge.default.init(payload).then(function (data) {
    _app = data;
    delete coinview.init;
    return coinview;
  });
};

function register(method) {
  var names = method.split('.');
  var m = names[0];
  var f = names[1];

  if (!coinview[m]) {
    coinview[m] = {};
  }

  coinview[m][f] = function (payload) {
    if (!_app) {
      throw new Error('Please call after "coinview.init"');
    }

    return _bridge.default.send(method, payload);
  };
}

var _default = coinview;
exports.default = _default;