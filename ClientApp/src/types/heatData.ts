interface HeatDataHousesConsumption {
    Date: string,
    Consumption: Number,
    Weather: Number
}

interface HeatDataPlantsConsumption {
    Date: string,
    Consumption: Number,
    Price: Number
}

export type HeatDataConsumptions = HeatDataHousesConsumption | HeatDataPlantsConsumption

interface HeatDataConsumer {
    "ConsumerId": number,
    "Name": string,
    "consumptions": HeatDataConsumptions[]
}

export interface HeatDataConsumers {
    houses?: HeatDataConsumer[],
    plants?: HeatDataConsumer[],
}


export interface HeatDataState {
    heatData: HeatDataConsumers | null;
    loading: boolean;
    error: null | string;
    heatDataFormatting?: any
}


export enum HeatDataActionTypes {
    FETCH_HEAT_DATA = "FETCH_HEAT_DATA",
    FETCH_HEAT_DATA_SUCCESS = "FETCH_USERS_SUCCESS",
    FETCH_HEAT_DATA_ERROR = "FETCH_USERS_ERROR",
    FORMATTING_DATA_INIT = "FORMATTING_DATA_INIT",
    UPDATE_FORMATTING_DATA_BY_CHANGING_CELL = "UPDATE_FORMATTING_DATA_BY_CHANGING_CELL",
}

interface FetchHeatDataAction {
    type: HeatDataActionTypes.FETCH_HEAT_DATA;
}

interface FetchHeatDataSuccessAction {
    type: HeatDataActionTypes.FETCH_HEAT_DATA_SUCCESS;
    payload: HeatDataConsumers;
}

interface FetchHeatDataErrorAction {
    type: HeatDataActionTypes.FETCH_HEAT_DATA_ERROR;
    payload: string;
}

interface FormattingDataInitAction {
    type: HeatDataActionTypes.FORMATTING_DATA_INIT;
    heatDataFormatting: object[];
}

interface updateFormattingDataByChangingCell {
    type: HeatDataActionTypes.UPDATE_FORMATTING_DATA_BY_CHANGING_CELL;
    heatDataCellParam: any;
}

export type HeatDataAction =
    FetchHeatDataAction |
    FetchHeatDataSuccessAction |
    FetchHeatDataErrorAction |
    FormattingDataInitAction |
    updateFormattingDataByChangingCell;

