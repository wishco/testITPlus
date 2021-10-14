import {
    ConsumerSectionNameItem,
    IHeatDataConsumer,
    IHeatDataConsumers,
    IHeatDataState
} from "../../types/heatData/heatData";
import {HeatDataAction, HeatDataActionTypes} from "../../types/heatData";
import {heatDataFormatting} from "../../types/heatData/heatDataFormatting";
import {GridCellEditCommitParams} from "@mui/x-data-grid";
import {
    LineConsumersSettings,
    LineConsumersSettingsName
} from "../../types/heatData/lineConsumersSettings";

const chartSettingsEmpty = {chartsSettingsDefault: null, chartsSettingsUser: null}
const lineConsumersSettingsEmpty: LineConsumersSettings = {line1: [], line2: [], line3: []}

const initialState: IHeatDataState = {
    loading: false,
    error: null,
    heatData: null,
    heatDataFormatting: null,
    ChartSettings: chartSettingsEmpty,
    lineConsumersSettings: lineConsumersSettingsEmpty
  }


export const heatDataReducer = (state = initialState, action: HeatDataAction): IHeatDataState => {
    switch (action.type) {

        case HeatDataActionTypes.FETCH_HEAT_DATA:
            return {
                loading: true,
                error: null,
                heatData: null,
                heatDataFormatting: null,
                ChartSettings: chartSettingsEmpty,
                lineConsumersSettings: lineConsumersSettingsEmpty
            }

        case HeatDataActionTypes.FETCH_HEAT_DATA_SUCCESS:
            return {...state, loading: false, error: null, heatData: action.payload}

        case HeatDataActionTypes.FETCH_HEAT_DATA_ERROR:
            return {...state, loading: false, error: action.payload, heatData: null, heatDataFormatting: null}

        case HeatDataActionTypes.INIT_FORMATTING_HEAT_DATA:
            return {...state, heatDataFormatting: action.heatDataFormatting}

        case HeatDataActionTypes.UPDATE_CHART_SETTINGS_USER: // action.settingForChanging
            let isItemExistBefore = false
            const chartName:LineConsumersSettingsName = action.settingForChanging.ChartName

            let nevVal = state.lineConsumersSettings[chartName].map((el: any) => {
                if (el.datasetIndex !== action.settingForChanging.datasetIndex) return el
                isItemExistBefore = true
                return {
                    datasetIndex: action.settingForChanging.datasetIndex,
                    settings: {...el.settings, ...action.settingForChanging.settings}
                }
            })

            if (!isItemExistBefore) {
                const newItem = {
                    datasetIndex: action.settingForChanging.datasetIndex, settings: action.settingForChanging.settings
                }
                nevVal = [...nevVal, newItem]
            }

            return {
                ...state,
                lineConsumersSettings: {...state.lineConsumersSettings, [action.settingForChanging.ChartName]: nevVal}
            }

        case HeatDataActionTypes.INIT_CHART_SETTINGS_DEFAULT:
            return {...state, ChartSettings: action.chartsSettings}

        case HeatDataActionTypes.SYNCHRONIZATION_HEAT_DATA_BY_CHANGING_CELL:
            if ((state.heatDataFormatting === null) || (state.heatData === null)) return {...state} // условие от подсветки TS
            const newHeatData = synchronization_heat_data_by_changing_cell(state.heatDataFormatting, state.heatData, action.heatDataCellParam)
            return {...state, heatData: newHeatData as IHeatDataConsumers}

        case HeatDataActionTypes.UPDATE_FORMATTING_DATA_BY_CHANGING_CELL:
            if (state.heatDataFormatting === null) return {...state} // условие от подсветки TS,
            const heatDataFormatting = state.heatDataFormatting.map(item => {
                if (item.id !== action.heatDataCellParam.id) return item
                return {...item, [action.heatDataCellParam.field]: action.heatDataCellParam.value}
            })
            return {...state, heatDataFormatting: heatDataFormatting}

        default:
            return state
    }
}


// синхронизируем развернутый массив и базовый объект из API (но данные берем из развернутого массива), из задания, не понятно, надо или нет сохранять и синхронизировать базовый объект
function synchronization_heat_data_by_changing_cell(heatDataFormatting: heatDataFormatting[], heatData: IHeatDataConsumers, param: GridCellEditCommitParams) {

    const changingIndex = heatDataFormatting.findIndex(item => item.id === param.id) // индекс в массиве heatDataFormatting изменяемого объекта
    const changingConsumerId = heatDataFormatting[changingIndex].ConsumerId // получаем ConsumerId в изменяемом объекте
    const changingConsumerSectionName = heatDataFormatting[changingIndex].ConsumerSectionName // получаем ConsumerSectionName в изменяемом объекте
    const changingConsumerDate = heatDataFormatting[changingIndex].Date // получаем Date в изменяемом объекте

    let heatDataNew: Partial<IHeatDataConsumers> = {}

    Object.entries(heatData).forEach((el: any) => {
        const currSectionName: ConsumerSectionNameItem = el[0]
        const currSection: IHeatDataConsumer[] = el[1]
        const isSection = (currSectionName === changingConsumerSectionName)
        const resultSection = currSection.map((_el: IHeatDataConsumer) => { // перебираем массив Consumers(потребителей) в одной секции, и ищем совпадение по ConsumerId
            const _isId = (_el.ConsumerId === changingConsumerId)
            const resConsumer = Object.values(_el.consumptions).map((__el) => { // перебираем массив consumptions, и ищем совпадение по Date
                const __isDate = (__el.Date === changingConsumerDate)
                if (isSection && _isId && __isDate) return { // если все условия сложились, значит изменения были в этом элементе
                    ...__el, [param.field]: param.value // заносим измененное значение
                }
                return __el
            })
            return {..._el, consumptions: resConsumer}
        })
        heatDataNew = {...heatDataNew, [currSectionName]: resultSection}
    })
    return heatDataNew
}