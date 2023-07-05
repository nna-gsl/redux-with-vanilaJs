const { produce } = require('immer');
const redux = require('redux');
const createStore = redux.createStore;
const reduxLogger = require('redux-logger');
const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger();
const bindActionCreators = redux.bindActionCreators;
const USER_INFO = "USER_INFO";

const userChange = () => {
    return {
        type: USER_INFO,
    }
}

const initialState  = {
    name: 'naitik',
    age: 22,
    address: {
        landmark: "katargam",
        city: "surat",
        state: "gujarat",
        contry: "india"
    }
}

const reducer = (state = initialState , action) => {
    switch (action.type) {
        case USER_INFO:
            return produce(state , (def) => {
                def.address.city = "ahemdabad",
                def.age = 20
            })
    
        default:
            return state
    }
}


const store = createStore(reducer, applyMiddleware(logger));
const actions = bindActionCreators({userChange}, store.dispatch);
actions.userChange();

const unsubscribe = store.subscribe(() => {});
unsubscribe();