// создание объекта, общие опции визуального отображения M IU библиотеки
import {formatRGBColorToString, getRandomNumberRGBColor} from "./color";
import {
    ConsumerSectionNameItem,
    ConsumersSectionName,
    IHeatDataConsumer,
    IHeatDataConsumers
} from "../../../types/heatData/heatData";
import {IChartSettings, IChartsSettingsDefault, ISettingsDefault} from "../../../types/charts";


export const initChartSettings = (heatData: IHeatDataConsumers): IChartSettings => {
    let defaultSettings = {chartsSettingsDefault: getChartsSettingsDefault(heatData)}
    return { ...defaultSettings }
}

// получить настройки поумолчанию
function getChartsSettingsDefault(heatData: IHeatDataConsumers): IChartsSettingsDefault[] {
    let resultArray: Partial<IChartsSettingsDefault>[] = []
    Object.entries(heatData).forEach((el:any) => {
        const sectionName: ConsumerSectionNameItem = el[0]
        const sectionConsumers: IHeatDataConsumer[] = el[1]
        Object.values(sectionConsumers).forEach((_el: IHeatDataConsumer) => {
            const _color = getRandomNumberRGBColor()
            resultArray.push({
                ConsumerId: _el.ConsumerId,
                Name: _el.Name,
                SectionName: sectionName,
                Settings: {
                    label: _el.Name,
                    backgroundColor: formatRGBColorToString(_color, 0.2),
                    borderColor: formatRGBColorToString(_color),
                    // borderWidth: 1
                }
            })
        })
    })
    return resultArray as IChartsSettingsDefault[]
}