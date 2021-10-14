import {Dispatch} from "redux";
import axios from "axios";
import {HeatDataAction, HeatDataActionTypes} from "../../types/heatData";
import {getHeatDataFormatting} from "../../components/HeatData/HeatData";
import {GridCellEditCommitParams} from "@mui/x-data-grid";
import {initChartSettings} from "../../components/HeatData/viewSettings";
import {IChartsSettingsUser} from "../../types/charts";
import {ISettingForChanging} from "../../types/heatData/lineConsumersSettings";


export const fetchHeatData = () => {
    return async (dispatch: Dispatch<HeatDataAction>) => {
        try {
            dispatch({type: HeatDataActionTypes.FETCH_HEAT_DATA})
            const response = await axios.get('https://localhost:5001/api/Data')
            await new Promise<string>((resolve) => {
                setTimeout(() => resolve("Delay emulation worked well"), 100)
            })
            dispatch({type: HeatDataActionTypes.INIT_FORMATTING_HEAT_DATA, heatDataFormatting: getHeatDataFormatting(response.data)})
            dispatch({type: HeatDataActionTypes.INIT_CHART_SETTINGS_DEFAULT, chartsSettings: initChartSettings(response.data)})
            dispatch({type: HeatDataActionTypes.FETCH_HEAT_DATA_SUCCESS, payload: response.data})

        } catch (e) {
            dispatch({type: HeatDataActionTypes.FETCH_HEAT_DATA_ERROR, payload: "Произошла Ошибка при загрузке данных"})
        }
    }
}

export const getGridRowDataByChangingItem = (heatDataCellParam: GridCellEditCommitParams) => {
    return async function (dispatch: Dispatch<HeatDataAction>) {
        dispatch({
            type: HeatDataActionTypes.UPDATE_FORMATTING_DATA_BY_CHANGING_CELL,
            heatDataCellParam: heatDataCellParam
        })

        dispatch({
            type: HeatDataActionTypes.SYNCHRONIZATION_HEAT_DATA_BY_CHANGING_CELL,
            heatDataCellParam: heatDataCellParam
        })
    }
}

export const updateChartSettingsUser = (settingForChanging: ISettingForChanging) => {
    return async function (dispatch: Dispatch<HeatDataAction>) {

        dispatch({
            type: HeatDataActionTypes.UPDATE_CHART_SETTINGS_USER,
            settingForChanging: settingForChanging
        })
    }
}