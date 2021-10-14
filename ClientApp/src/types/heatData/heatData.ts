import {IChartSettings, ISettingsUser} from "../charts";
import {heatDataFormatting} from "./heatDataFormatting";
import {LineConsumersSettings} from "./lineConsumersSettings";

export enum HeatDataConsumptionFieldsName {
    Date="Date",
    Consumption="Consumption",
    Weather="Weather",
    Price="Price",
}

interface IHeatDataHousesConsumption {
    [HeatDataConsumptionFieldsName.Date]: string,
    [HeatDataConsumptionFieldsName.Consumption]: Number,
    [HeatDataConsumptionFieldsName.Weather]: Number,
    [HeatDataConsumptionFieldsName.Price]: Number,
}

export type IHeatDataConsumptionFieldsNames = HeatDataConsumptionFieldsName.Date | HeatDataConsumptionFieldsName.Consumption| HeatDataConsumptionFieldsName.Weather| HeatDataConsumptionFieldsName.Price

interface IHeatDataConsumption {
    [HeatDataConsumptionFieldsName.Date]: string,
    [HeatDataConsumptionFieldsName.Consumption]: Number,
    [HeatDataConsumptionFieldsName.Weather]: Number,
    [HeatDataConsumptionFieldsName.Price]: Number,
}

export interface IHeatDataConsumer {
    ConsumerId: number,
    Name: string,
    consumptions: IHeatDataConsumption[]
}

export enum ConsumersSectionName {
    houses = "houses",
    plants = "plants"
}

export type ConsumerSectionNameItem = ConsumersSectionName.houses | ConsumersSectionName.plants
export type HeatDataConsumersSectionNames = IHeatDataHousesSection | IHeatDataPlantsSection

export interface IHeatDataHousesSection {
    [ConsumersSectionName.houses]: IHeatDataConsumer[]
}

export interface IHeatDataPlantsSection {
    [ConsumersSectionName.plants]: IHeatDataConsumer[]
}

export interface IHeatDataConsumers {
    [ConsumersSectionName.houses]: IHeatDataConsumer[],
    [ConsumersSectionName.plants]: IHeatDataConsumer[],
}

export interface IHeatDataState {
    heatData: IHeatDataConsumers | null;
    loading: boolean;
    error: null | string;
    heatDataFormatting: heatDataFormatting[] | null;
    ChartSettings: IChartSettings
    lineConsumersSettings: LineConsumersSettings
}