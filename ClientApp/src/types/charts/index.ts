import {ConsumerSectionNameItem, ConsumersSectionName} from "../heatData/heatData";

export enum IChartsNames {
    line1 = "line1",
    line2 = "line2",
    table1 = "table1"
}
export type ChartsNameTypes = IChartsNames.line1 | IChartsNames.line2 | IChartsNames.table1

export interface IChartSettings {
    chartsSettingsDefault: IChartsSettingsDefault[] | null // настройки общие, для всех графиков
    chartsSettingsUser?: IChartsSettingsUser[] | null // настройки для каждого вида графика, по имени
}

export interface IChartsSettingsBasic {
    ConsumerId: number,
    Name: string,
    SectionName: ConsumerSectionNameItem
}

export interface IChartsSettingsDefault extends IChartsSettingsBasic {
    Settings: ISettingsDefault
}

export interface ISettingsDefault {
    label?: string,
    backgroundColor?: string,
    borderColor?: string,
}

export interface IChartsSettingsUser extends IChartsSettingsBasic {
    ChartName: ChartsNameTypes
    Settings: ISettingsUser
}

export interface ISettingsUser extends ISettingsDefault {
    hidden?: boolean,
    datasetIndex?: number // значение приходит из chart.js компонента
    settings?: object // значение приходит из chart.js компонента
}

const ChartSettings: IChartSettings = {
    chartsSettingsDefault: [
        {
            ConsumerId: 1212,
            Name: '123123',
            SectionName: ConsumersSectionName.houses,
            Settings: {
                label: 'Жилой дом',
                backgroundColor: 'color1-1',
                borderColor: 'color1-2',
            }
        }
    ],
    chartsSettingsUser: [
        {
            ConsumerId: 1212,
            Name: "123123",
            SectionName: ConsumersSectionName.houses,
            Settings: {
                hidden: false
            },
            ChartName: IChartsNames.line1
        }
    ]
}
