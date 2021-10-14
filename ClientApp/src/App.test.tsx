import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import {useTypedSelector} from "./hooks/useTypedSelector";
import {useEffect} from "react";
import {fetchHeatData} from "./store/action-creator/heatData";

it('renders without crashing', () => {
    const {heatDataFormatting, error, loading} = useTypedSelector(state => state.heatData)
    const storeFake = (state: any) => ({
        default: () => {},
        subscribe: () => {},
        dispatch: () => {},
        getState: () => ({ ...state })
    });
    const store = storeFake({}) as any;

    // useEffect(() => {
    //     fetchHeatData()
    // }, [])

    ReactDOM.render(
        <Provider store={store}>
            <MemoryRouter>
                <App/>
            </MemoryRouter>
        </Provider>, document.createElement('div'));
});
