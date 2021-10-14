import {ConsumerSectionNameItem} from "./heatData";

export interface heatDataFormattingBasic {
    id: number,
    ConsumerId: number,
    ConsumerSectionName: ConsumerSectionNameItem,
    Name: string,
    Date: string,
    Consumption: number
}
export interface heatDataFormattingHouses extends heatDataFormattingBasic {
    Weather:number
}

export interface heatDataFormattingPlants extends heatDataFormattingBasic {
    Price:number
}

export type heatDataFormatting = heatDataFormattingHouses | heatDataFormattingPlants