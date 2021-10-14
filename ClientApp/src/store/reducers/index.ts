import {combineReducers} from "redux";
import {heatDataReducer} from "./heatDataReducer";


export const rootReducer = combineReducers( {
    heatData: heatDataReducer,
})

export type RootState = ReturnType<typeof rootReducer>