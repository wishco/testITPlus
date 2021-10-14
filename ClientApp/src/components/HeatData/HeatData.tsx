import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";
import HeatDataTable from "./HeatDataTable";
import {HeatGroup} from "../group/HeatGroup";
import {heatDataFormatting, heatDataFormattingBasic} from "../../types/heatData/heatDataFormatting";
import {
    ConsumerSectionNameItem,
    IHeatDataConsumer,
    IHeatDataConsumers,
} from "../../types/heatData/heatData";


const HeatData: React.FC = () => {
    const {heatData, heatDataFormatting, loading} = useTypedSelector(state => state.heatData)
    const {getGridRowDataByChangingItem} = useActions()




    return (
        <HeatGroup>
            <HeatDataTable
                heatDataFormatting={heatDataFormatting}
                loading={loading}
                getGridRowDataByChangingItem={getGridRowDataByChangingItem}
            />
        </HeatGroup>
    )
};

export default HeatData;

export function getHeatDataFormatting (heatData: IHeatDataConsumers):heatDataFormatting[]  {
    let uniqId = 1
    let arrResult: Partial<heatDataFormatting>[] = []
    Object.entries(heatData).forEach((el:any) => {
        const currSectionName:ConsumerSectionNameItem = el[0]
        const currSection:IHeatDataConsumer[] = el[1]
        return currSection.forEach((_el:IHeatDataConsumer) => {
            return Object.values(_el.consumptions).forEach((__el) => {
                let __heatDataFormatting:any = {
                    id: uniqId++,
                    ConsumerId: _el.ConsumerId,
                    ConsumerSectionName: currSectionName,
                    Name: _el.Name,
                    ...__el
                }
                arrResult.push(__heatDataFormatting)
            })
        })
    })
    return arrResult as heatDataFormatting[]
}






















