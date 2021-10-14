import * as React from 'react';
import {BrowserRouter, Redirect, Route} from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import './custom.css'
import HeatData from "./components/HeatData/HeatData";
import {HeatChart} from "./components/DataChart/HeatChart";
import {useEffect} from "react";
import {fetchHeatData} from "./store/action-creator/heatData";

export default () => {


    return (
        <div>

            <BrowserRouter>
                <Layout>
                    <Route key={`/`} exact path={`/`}
                           render={() => <Redirect to={`/heat-datachart`}/>}/>
                    <Route exact path='/home' component={Home} />
                    <Route exact path='/heat' component={HeatData} />
                    <Route exact path='/heat-datachart' component={HeatChart} />
                </Layout>
            </BrowserRouter>

        </div>
        )
};
