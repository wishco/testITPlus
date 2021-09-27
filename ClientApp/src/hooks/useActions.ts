import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import * as HeatDataActionCreators from '../store/action-creator/heatData'

export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(HeatDataActionCreators, dispatch)
}