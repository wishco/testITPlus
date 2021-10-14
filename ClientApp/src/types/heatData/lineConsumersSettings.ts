import {ConsumersSectionName} from "./heatData";
import {ISettingsUser} from "../charts";

export enum LineConsumersSettingsNames {
    line1 = "line1",
    line2 = "line2",
    line3 = "line3",
}

export type LineConsumersSettingsName = LineConsumersSettingsNames.line1 | LineConsumersSettingsNames.line2 | LineConsumersSettingsNames.line3

export interface LineConsumersSettings {
    [LineConsumersSettingsNames.line1]: ISettingsUser[],
    [LineConsumersSettingsNames.line2]: ISettingsUser[],
    [LineConsumersSettingsNames.line3]: ISettingsUser[],
}

export interface ISettingForChanging {
    ChartName: LineConsumersSettingsName,
    datasetIndex: number,
    settings: object
}

