"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.methods = exports.default = void 0;

var _app = _interopRequireWildcard(require("./app"));

var _methods2 = _interopRequireDefault(require("./methods"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

_methods2.default.forEach(_app.register);

if (window) {
  window.coinview = _app.default;
}

var _default = _app.default;
exports.default = _default;
var methods = _methods2.default;
exports.methods = methods;