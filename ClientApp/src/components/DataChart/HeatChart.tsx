import React, {useEffect, useMemo, useState} from "react";
import {HeatGroup} from "../group/HeatGroup";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {HeatChartLine} from "./HeatChartLine";
import {useActions} from "../../hooks/useActions";
import {
    ConsumerSectionNameItem,
    ConsumersSectionName,
    IHeatDataConsumer,
    IHeatDataConsumptionFieldsNames
} from "../../types/heatData/heatData";
import {ISettingsUser} from "../../types/charts";
import {LineConsumersSettingsNames} from "../../types/heatData/lineConsumersSettings";
import "chartjs-plugin-datalabels";
import {HeatDataConsumptionFieldsName} from "../../types/heatData/heatData";

export const HeatChart: React.FC = () => {
    const {loading, heatData} = useTypedSelector(state => state.heatData)
    const {chartsSettingsDefault, chartsSettingsUser} = useTypedSelector(state => state.heatData.ChartSettings)
    const {line1, line2, line3} = useTypedSelector(state => state.heatData.lineConsumersSettings)
    const {updateChartSettingsUser} = useActions()
    const line_settingDefault = {hidden: false}

    const [line1_fullSettings, setLine1_fullSettings] = useState({})
    const [line2_fullSettings, setLine2_fullSettings] = useState({})
    const [line3_fullSettings, setLine3_fullSettings] = useState({})


    interface ILineFullSettings {
        lineComponentSettingsUser: ISettingsUser[],
        heatDataConsumers:IHeatDataConsumer[],
        sectionConsumerName: ConsumerSectionNameItem,
        x_fieldName: IHeatDataConsumptionFieldsNames,
        y_fieldName: IHeatDataConsumptionFieldsNames,
        isDate?: boolean
        borderColorMarge?: boolean,
    }


    function getLineFullSettings(_propFunction: ILineFullSettings):null | object[] {
        const {lineComponentSettingsUser, heatDataConsumers, sectionConsumerName,  x_fieldName, y_fieldName, isDate=false, borderColorMarge=false} = _propFunction
        if ((chartsSettingsDefault === null) || (heatData === null)) return null // выходим, если не произошла иннициализация данных

            let res1 = heatDataConsumers.map((el, indexConsumer)=>{
                const INDEX_INTO_SETTING_DEFAULT = chartsSettingsDefault.filter(_el=>_el.ConsumerId === el.ConsumerId)[0].ConsumerId -1

               const XY = el.consumptions.map((_el):any=>{
                    if (isDate) return {x: String(_el[x_fieldName]).split('T')[0] , y: String(_el[y_fieldName]).split('T')[0]} // если в осях дата, то убираем из строки лишнюю информацию, так как засоряет график
                    return {x: _el[x_fieldName], y: _el[y_fieldName]}
                })
                const data = isDate ? XY: (XY.sort((a: any, b: any) => (a.x - b.x))) // сортируем только, если в осях нет даты...
                const settingUserObj = lineComponentSettingsUser.filter((_el) => _el.datasetIndex === indexConsumer)
                let settingUserValue = (settingUserObj.length > 0) ? settingUserObj[0].settings : line_settingDefault

                if (borderColorMarge) settingUserValue = {...settingUserValue, backgroundColor: chartsSettingsDefault[INDEX_INTO_SETTING_DEFAULT].Settings.borderColor}
                return {
                    data, ...chartsSettingsDefault[INDEX_INTO_SETTING_DEFAULT].Settings ,  ...settingUserValue
                }
            })

            return res1// возвращаем иготовое значение из функции

    }

    useEffect(() => {
        if (!heatData) return
        const getArrConsumers = heatData[ConsumersSectionName.houses]
        const lineFullSettings = getLineFullSettings({
            lineComponentSettingsUser: line1,
            heatDataConsumers: getArrConsumers,
            sectionConsumerName: ConsumersSectionName.houses,
            x_fieldName: HeatDataConsumptionFieldsName.Weather,
            y_fieldName: HeatDataConsumptionFieldsName.Consumption
        })
        if (!lineFullSettings) return // данных нет - выходим
        setLine1_fullSettings({datasets: lineFullSettings})
    }, [heatData, line1])

    useEffect(() => {
        if (!heatData) return
        const getArrConsumers = heatData[ConsumersSectionName.plants]
        const lineFullSettings = getLineFullSettings({
            lineComponentSettingsUser: line2,
            heatDataConsumers: getArrConsumers,
            sectionConsumerName: ConsumersSectionName.plants,
            x_fieldName: HeatDataConsumptionFieldsName.Price,
            y_fieldName: HeatDataConsumptionFieldsName.Consumption
        })
        if (!lineFullSettings) return // данных нет - выходим
        setLine2_fullSettings({datasets: lineFullSettings})
    }, [heatData, line2])

    useEffect(() => {
        if (!heatData) return
        const getArrConsumers = [ ...heatData[ConsumersSectionName.plants],...heatData[ConsumersSectionName.houses]]
        const lineFullSettings = getLineFullSettings({
            lineComponentSettingsUser: line3,
            heatDataConsumers: getArrConsumers,
            sectionConsumerName: ConsumersSectionName.plants,
            x_fieldName: HeatDataConsumptionFieldsName.Date,
            y_fieldName: HeatDataConsumptionFieldsName.Consumption,
            isDate: true,
            borderColorMarge: true
        })
        if (!lineFullSettings) return // данных нет - выходим

        const m1 = {datasets: lineFullSettings}
        setLine3_fullSettings(m1)
    }, [heatData, line3])


    return (
        <HeatGroup>


            <HeatChartLine
                chartName={LineConsumersSettingsNames.line3}
                dataChart={line3_fullSettings}
                loading={loading}
                lineInjects={{axisTitle: {x: "Дата", y: "Потребление"}, needStacked: true, needFill: true, dateTime: true, borderWidth:0.5}}
                updateChartSettingsUser={updateChartSettingsUser}
            />

            <HeatChartLine
                chartName={LineConsumersSettingsNames.line1}
                dataChart={line1_fullSettings}
                loading={loading}
                lineInjects={{axisTitle: {x: "Температура окр.воздуха", y: "Потребление"} }}
                updateChartSettingsUser={updateChartSettingsUser}
            />

            <HeatChartLine
                chartName={LineConsumersSettingsNames.line2}
                dataChart={line2_fullSettings}
                loading={loading}
                lineInjects={{axisTitle: {x: "Цена на кирпич", y: "Потребление"}}}
                updateChartSettingsUser={updateChartSettingsUser}
            />

        </HeatGroup>
    )
}




