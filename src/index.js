import coinview from './app'
import {register} from './app'
import _methods from './methods'

_methods.forEach(register)

if (window) {
  window.coinview = coinview
}

export default coinview

export const methods = _methods
