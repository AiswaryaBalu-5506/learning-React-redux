import {createStore} from 'redux'
import cakeReducer from './redux/cakes/CakeReducer'

const store = createStore(cakeReducer)

export default store