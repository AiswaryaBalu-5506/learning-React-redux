//APPLICATION - FETCH USERS FROM AN API ENDPOINT
const redux = require('redux')
const thunkMiddleware = require('redux-thunk').default 
const axios = require('axios')
const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED'

//state
const initialState = {
    loading: false,
    users: [],
    error: ''
}

//ACTIONS
function fetchUsersRequest(){
    return {
        type: FETCH_USERS_REQUEST,
        info: 'Request to fetch users from the endpoint'
    }
}

function fetchUsersSuccess(users){
    return {
        type: FETCH_USERS_SUCCESS,
        info: 'Fetching users successful',
        payload: users
    }
}

function fetchUsersFailed(errors){
    return {
        type: FETCH_USERS_FAILED,
        info: 'Fetching users failed',
        payload: errors
    }
}

//REDUCERS
const reducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_USERS_REQUEST: return{
            ...state, 
            loading: true
        }
        case FETCH_USERS_SUCCESS: return {
            ...state,
            loading: false,
            users: action.payload,
            error: ''
        }
        case FETCH_USERS_FAILED: return {
            ...state,
            loading: false,
            users: [],
            error: action.payload             
        }        
        default: return state
    }
}

const fetchUsers = () => {
    return function(dispatch){
        dispatch(fetchUsersRequest())
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then( response  => {
            dispatch(fetchUsersSuccess(response.data.map(user => user.id)))
        })
        .catch( err => {
            dispatch(fetchUsersFailed(err.message))
        })
    }
}

//REDUX STORE
const store = redux.createStore(reducer, redux.applyMiddleware(thunkMiddleware))
const unsubscribe = store.subscribe( () => {
    console.log(store.getState())
})
store.dispatch(fetchUsers())
//unsubscribe()

