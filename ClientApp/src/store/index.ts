import {applyMiddleware, compose, createStore} from "redux";
import thunk from 'redux-thunk';
import {rootReducer} from "./reducers";
import { composeWithDevTools } from 'redux-devtools-extension';

// export const store = createStore(rootReducer, applyMiddleware(thunk))
//@ts-ignore
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)))
