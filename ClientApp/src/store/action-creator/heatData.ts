import {HeatDataAction, HeatDataActionTypes} from "../../types/heatData";
import {Dispatch} from "redux";
import axios from "axios";
import {getRowsHeatData} from "../../components/HeatData/heatDataController";


export const fetchHeatData = () => {
    return async (dispatch: Dispatch<HeatDataAction>) => {
        try {
            dispatch({ type: HeatDataActionTypes.FETCH_HEAT_DATA })
            const response = await axios.get('https://localhost:5001/api/Data')
            setTimeout(()=>{
                dispatch({type: HeatDataActionTypes.FORMATTING_DATA_INIT, heatDataFormatting: getRowsHeatData(response.data)})
                dispatch({type: HeatDataActionTypes.FETCH_HEAT_DATA_SUCCESS, payload: response.data})
            }, 1300)
        } catch (e) {

            dispatch({ type: HeatDataActionTypes.FETCH_HEAT_DATA_ERROR , payload: "Произошла Ошибка при загрузке данных"})
        }
    }
}

export const GetGridRowDataByChangingItem = (heatDataFormatting:object) => {
    return  (dispatch: Dispatch<HeatDataAction>) => {
        dispatch({
            type: HeatDataActionTypes.UPDATE_FORMATTING_DATA_BY_CHANGING_CELL,
            heatDataCellParam: heatDataFormatting
        })
    }


}

