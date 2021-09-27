import {HeatDataAction, HeatDataState, HeatDataActionTypes} from "../../types/heatData";


const initialState: HeatDataState = {
    heatData: null,
    loading: false,
    error: null,
    heatDataFormatting: null
}


export const heatDataReducer = (state = initialState, action: HeatDataAction): HeatDataState => {
    switch (action.type) {

        case HeatDataActionTypes.FETCH_HEAT_DATA:
            return {loading: true, error: null, heatData:null, heatDataFormatting: null}

        case HeatDataActionTypes.FETCH_HEAT_DATA_SUCCESS:
            return {...state, loading: false, error: null, heatData: action.payload}

        case HeatDataActionTypes.FETCH_HEAT_DATA_ERROR:
            return {loading: false, error: action.payload, heatData:null, heatDataFormatting: null }

        case HeatDataActionTypes.FORMATTING_DATA_INIT:
            return {...state, heatDataFormatting: action.heatDataFormatting}

        case HeatDataActionTypes.UPDATE_FORMATTING_DATA_BY_CHANGING_CELL:
            let ItemChanging:any = null
            let arrayWithoutItemChanging =  state.heatDataFormatting.filter((el:any)=> {
                if (el.id !== action.heatDataCellParam.id) return true
                ItemChanging = el
                return false
            })
            let newRow = {...ItemChanging, [action.heatDataCellParam.field]: action.heatDataCellParam.value}

            return {
                ...arrayWithoutItemChanging
                ,
                heatDataFormatting: [
                    ...arrayWithoutItemChanging, newRow
                ]
            }


        default:
            return state
    }
}