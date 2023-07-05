const redux = require("redux");
const axios = require('axios');
const thunkMiddleware = require('redux-thunk').default;
const applyMiddleware = redux.applyMiddleware;
const createStore = redux.createStore;
const FETCH_USER_REQUESTED = "FETCH_USER_REQUESTED";
const FETCH_USER_SUCCEEDED = "FETCH_USER_SUCCEEDED";
const FETCH_USER_FAILED = "FETCH_USER_FAILED";

const initialState = {
    loading: false,
    userList: [1],
    error: ""
}

const fetchUserRequest = () => {
    return {
        type: FETCH_USER_REQUESTED
    }
}

const fetchUserSuccess = (users) => {
    return {
        type: FETCH_USER_SUCCEEDED,
        payload: users
    }
}

const fetchUserFailed = (error) => {
    return {
        type: FETCH_USER_FAILED,
        payload: error
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER_REQUESTED:
            return {
                isLoading: true,
                userList: [],
                error: ""
            }
        case FETCH_USER_SUCCEEDED:
            return {
                loading: false,
                userList: action.payload,
                error: ''
            }
        case FETCH_USER_FAILED:
            return {
                loading: false,
                userList: [],
                error: ''
            }
        default:
            return state
    }
}


const fetchUser = () => {
    return function(dispatch){
        dispatch(fetchUserRequest());
        axios.get("https://jsonplaceholder.typicode.com/users")
        .then((response) => {
            const users = response.data.map(user => user.id);
            dispatch(fetchUserSuccess(users));
        })
        .then(error => {
            dispatch(fetchUserFailed(error?.message));
        })
    }
}

const store = createStore(reducer ,applyMiddleware(thunkMiddleware));
store.subscribe(() => console.log(store.getState()));
store.dispatch(fetchUser());