import * as React from 'react';
import {BrowserRouter, Redirect, Route} from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import './custom.css'
import HeatData from "./components/HeatData/HeatData";

export default () => (
    <div>

     <BrowserRouter>
        <Layout>
            <Route key={`/`} exact path={`/`}
                   render={() => <Redirect to={`/heat`}/>}/>
            <Route exact path='/home' component={Home} />
            <Route exact path='/heat' component={HeatData} />
        </Layout>
     </BrowserRouter>



    </div>
);
