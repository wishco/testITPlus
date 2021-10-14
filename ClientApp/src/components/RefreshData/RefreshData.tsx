import {Button, Tooltip} from "@mui/material";
import React, {useRef, useState} from "react";
import {useActions} from "../../hooks/useActions";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import Refresh from '@mui/icons-material/Refresh';
import LoadingButton from '@mui/lab/LoadingButton';

interface Props {
    loading: boolean
}

export const RefreshData: React.FC<Props> = props => {
    const {loading} = props
    const {fetchHeatData} = useActions()
    const [isHover, setIsHover] = useState(false);

    function updateDataFromServer() {
        fetchHeatData()
    }

    const spanWrapper = {display: "flex", "justifyContent": "flex-end"}

    return (
        <span style={spanWrapper}>
        <Tooltip arrow open={!loading && isHover} placement="left"
                 title={"Получить данные с сервера и обновить таблицу."}>
                <span>
                <LoadingButton loading={loading} variant="outlined" onClick={() => updateDataFromServer()}
                               loadingPosition="start"
                               startIcon={<Refresh/>}
                               onMouseOver={() => setIsHover(true)}
                               onMouseLeave={() => setIsHover(false)}
                               style={{width: 160, marginBottom: 20,  marginTop: 20, marginRight: 10}}
                >
                    {loading ? "Обновление..." : "Обновить"}
                </LoadingButton>
                </span>
        </Tooltip>
                </span>
    )
}