import React, {useEffect} from "react";
import {RefreshData} from "../RefreshData/RefreshData";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";

export const HeatGroup: React.FC = props => {
    const {children} = props
    const {heatData, error, loading} = useTypedSelector(state => state.heatData)
    const {fetchHeatData} = useActions()

    useEffect(() => {
        if (heatData === null) updateDataFromServer()
    }, [])

    function updateDataFromServer() {
        fetchHeatData()
    }

    if (error) return (<h1>При загрузке данных, произошла ошибка</h1>)

    return (
        <div>
            <RefreshData loading={loading}/>
            {children}
        </div>
    )
}
