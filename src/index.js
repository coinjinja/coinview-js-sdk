import coinview from './app'
import {register} from './app'
import _methods from './methods'

_methods.forEach(register)

export default coinview
coinview._methods = _methods
