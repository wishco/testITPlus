import React, {useEffect} from 'react';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";
import HeatDataTable from "./HeatDataTable";


const HeatData: React.FC = () => {
    const {heatDataFormatting, error, loading} = useTypedSelector(state => state.heatData)
    const {fetchHeatData, GetGridRowDataByChangingItem} = useActions()

    useEffect(() => {
        fetchHeatData()
    }, [])

    if (error) return (<h1>При загрузке данных, произошла ошибка</h1>)

    return (
        <div>
            <HeatDataTable
                heatDataFormatting={heatDataFormatting}
                loading={loading}
                GetGridRowDataByChangingItem ={GetGridRowDataByChangingItem}
            />
        </div>
    )
};

export default HeatData;
