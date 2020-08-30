const redux = require('redux')
const createStore = redux.createStore
const BUY_CAKE = 'BUY_CAKE'
const BAKE_CAKE = 'BAKE_CAKE'

//ACTION
function buyCake(){
    return {
        type: BUY_CAKE,
        info: 'Customer buys the cake.'
    }
}

function bakeCake(){
    return {
        type: BAKE_CAKE,
        info: 'Shopkeeper bakes new cake and adds to store'
    }
}

//STATE
const initialState = {
    numOfCakes: 10
}

//REDUCER (prevState, action) => newState
const reducer = (state = initialState, action) => {
    switch(action.type){
        case BUY_CAKE: return{
            ...state, //always create a copy of the state object, and chage only the required elements
            numOfCakes: state.numOfCakes- 1
        }
        case BAKE_CAKE: return{
            ...state,
            numOfCakes: state.numOfCakes + 1
        }
        default: return state
    }
}

const store = createStore(reducer) //The reducer has the initial state - responsibility 1
console.log(store.getState())  //Allows the access of the current state via getState() - responsibility 2
//Responsibility 4 - should allow apps to subscribe to the redux store
const unsubscribe = store.subscribe( () => {
    console.log(store.getState())
})
store.dispatch(buyCake()) //responsibility 3 - the store allows dispatchers to alter the state, i.e., allows an action to occur.
store.dispatch(bakeCake())
store.dispatch(buyCake())
//unsubscribing - resonsibility 5
unsubscribe()




