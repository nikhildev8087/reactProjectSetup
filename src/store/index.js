import { createStore, applyMiddleware, compose } from "redux";

import { ThunkMiddleware } from "redux-thunk";
import { loadState } from "./localstorage";
import logger from "redux-logger";
import rootReducer from "../reducers";

function saveToLocalStorage(state){
    try{
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    }catch(e){
        return undefined
    }
}


// create redux store 

let persistedState = loadState();

const store = createStore(rootReducer, persistedState, compose(
    applyMiddleware(ThunkMiddleware, logger),

    window.devToolsExtension ? window.devToolsExtension() : function (f) {
        return f;
    }
));

const unsubscribe = store.subscribe(()=> {
    const state = store.getState();
    saveToLocalStorage(store);
})

export default store;