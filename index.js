const redux = require('redux');
const produce = require('immer').produce;
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const reduxLogger = require('redux-logger');
const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger();
const bindActionCreators = redux.bindActionCreators;
const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";
const ICECREAM_ORDERED = "ICECREAM_ORDERED";
const ICECREAM_RESTOKED = "ICECREAM_RESTOKED";

const orderCake = () => {
    return {
        type: CAKE_ORDERED,
        payload: 1
    };
};

const orderIcecream = () => {
    return {
        type: ICECREAM_ORDERED,
        payload: 1
    }
}

const cakeRestocked = (item = 1) => {
    return {
        type: CAKE_RESTOCKED,
        payload: item
    };
};

const icecreamRestocked = (item = 1) => {
    return {
        type: ICECREAM_RESTOKED,
        payload: item
    }
}

const initialCake = {
    cakesInStore: 10,
};

const initialIcecream = {
    icecreamInStore: 8
}

const cakeReducer = (state = initialCake, action) => {
    switch (action.type) {
        case CAKE_ORDERED:
            return {
                ...state,
                cakesInStore: state.cakesInStore - 1
            };
        case CAKE_RESTOCKED:
            return {
                ...state,
                cakesInStore: state.cakesInStore + action.payload
            };
        default:
            return state;
    }
};

const icecreamReducer = (state = initialIcecream, action) => {
    switch (action.type) {
        case ICECREAM_ORDERED:
            return {
                ...state,
                iceCreamOrder: state.icecreamInStore - 1
            }
        case ICECREAM_RESTOKED:
            return {
                ...state,
                icecreamInStore: state.icecreamInStore + action.payload
            }
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    cake: cakeReducer,
    icecream: icecreamReducer
});

const store = createStore(rootReducer, applyMiddleware(logger));
const actions = bindActionCreators({orderCake, orderIcecream, cakeRestocked, icecreamRestocked}, store.dispatch);

actions.orderCake();
actions.orderCake();
actions.cakeRestocked(3);
actions.icecreamRestocked(4);
actions.orderIcecream();
actions.orderIcecream();

const unsubscribe = store.subscribe(() => {});
unsubscribe();
