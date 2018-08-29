import coinview from './app'
import {register} from './app'
import methods from './methods'

methods.forEach(register)

if (window) {
  window.coinview = coinview
}

export default coinview
