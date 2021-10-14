
import * as React from 'react';
import {createTheme} from '@mui/material/styles';
import {
    DataGrid, GridCellParams,
    GridColumns, MuiEvent,
} from '@mui/x-data-grid';
import {ruRU} from '@mui/x-data-grid';


declare module '@mui/material/styles' {
    interface Theme {
        ruRU: any
    }

    interface ThemeOptions {
        ruRU: any
    }
}

interface HeatDataProps {
    heatDataFormatting:any,
    loading: boolean
    getGridRowDataByChangingItem: any
}

const theme = createTheme({ruRU});

const HeatDataTable: React.FC<HeatDataProps> = props => {
    const localeText = theme.ruRU.components.MuiDataGrid.defaultProps.localeText
    const {heatDataFormatting, loading, getGridRowDataByChangingItem} = props;

    function cellCancelHandler(params: GridCellParams, event: MuiEvent<React.SyntheticEvent<Element, Event>>) {
        if (params.value === undefined) event.defaultMuiPrevented = true
    }

    return (
        <div style={{height: 500, width: '100%'}}>

            <p style={{marginTop: "20px"}}>Сводная таблица</p>
            <DataGrid
                rows={(loading || !heatDataFormatting) ? [] : heatDataFormatting}
                columns={columns}
                loading={loading}
                localeText={localeText}
                rowHeight={30}

                onCellKeyDown={(params, event) => {
                    cellCancelHandler(params, event)
                }}
                onCellDoubleClick={(params, event) => {
                    cellCancelHandler(params, event)
                }}

                onCellEditCommit={(params, event) => {
                    event.defaultMuiPrevented = true
                     getGridRowDataByChangingItem(params)
                }}
            />
        </div>
    )
}

export default HeatDataTable;

const columns: GridColumns = [
    {
        field: 'id',
        headerName: 'id',
        width: 50,
        editable: false
    },
    {
        field: 'Name',
        headerName: 'Название',
        width: 160,
        editable: false
    },
    {
        field: 'Date',
        headerName: 'Дата',
        type: 'dateTime',
        width: 170,
        editable: false,
    },
    {
        field: 'Consumption',
        headerName: 'Потребление',
        type: 'number',
        width: 170,
        editable: true,
        align: "center"
    },
    {
        field: 'Weather',
        headerName: 'Температура',
        type: 'number',
        width: 150,
        editable: true,
    },
    {
        field: 'Price',
        headerName: 'Цена',
        type: 'number',
        width: 150,
        editable: true,
    },
];
