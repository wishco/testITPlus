import {IChartSettings, IChartsSettingsDefault, IChartsSettingsUser} from "../charts";
import {IHeatDataConsumers} from "./heatData";
import {heatDataFormatting} from "./heatDataFormatting";
import {GridCellEditCommitParams} from "@mui/x-data-grid";

export enum HeatDataActionTypes {
    FETCH_HEAT_DATA = "FETCH_HEAT_DATA",
    FETCH_HEAT_DATA_SUCCESS = "FETCH_USERS_SUCCESS",
    FETCH_HEAT_DATA_ERROR = "FETCH_USERS_ERROR",
    INIT_FORMATTING_HEAT_DATA = "INIT_FORMATTING_HEAT_DATA",
    UPDATE_FORMATTING_DATA_BY_CHANGING_CELL = "UPDATE_FORMATTING_DATA_BY_CHANGING_CELL",
    INIT_CHART_SETTINGS_DEFAULT = "INIT_CHART_SETTINGS_DEFAULT",
    UPDATE_CHART_SETTINGS_USER = "UPDATE_CHART_SETTINGS_USER",
    SYNCHRONIZATION_HEAT_DATA_BY_CHANGING_CELL = "SYNCHRONIZATION_HEAT_DATA_BY_CHANGING_CELL"
}

interface ISyncDataAction {
    type: HeatDataActionTypes.SYNCHRONIZATION_HEAT_DATA_BY_CHANGING_CELL
    heatDataCellParam: GridCellEditCommitParams
}

interface IInitChartSettingsDefaultAction {
    type: HeatDataActionTypes.INIT_CHART_SETTINGS_DEFAULT
    chartsSettings: IChartSettings
}

interface IUpdateChartSettingsUserAction {
    type: HeatDataActionTypes.UPDATE_CHART_SETTINGS_USER
    settingForChanging: any
}

interface IFetchHeatDataAction {
    type: HeatDataActionTypes.FETCH_HEAT_DATA;
}

interface IFetchHeatDataSuccessAction {
    type: HeatDataActionTypes.FETCH_HEAT_DATA_SUCCESS
    payload: IHeatDataConsumers
}

interface IFetchHeatDataErrorAction {
    type: HeatDataActionTypes.FETCH_HEAT_DATA_ERROR
    payload: string
}

interface IFormattingDataInitAction {
    type: HeatDataActionTypes.INIT_FORMATTING_HEAT_DATA
    heatDataFormatting: heatDataFormatting[]
}

interface IUpdateFormattingDataByChangingCellAction {
    type: HeatDataActionTypes.UPDATE_FORMATTING_DATA_BY_CHANGING_CELL
    heatDataCellParam: GridCellEditCommitParams
}

export type HeatDataAction =
    IFetchHeatDataAction | IFetchHeatDataSuccessAction | IFetchHeatDataErrorAction |
    IFormattingDataInitAction | IUpdateFormattingDataByChangingCellAction |
    IInitChartSettingsDefaultAction |
    IUpdateChartSettingsUserAction |
    ISyncDataAction
    ;

