import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import { Widgets } from './Widgets';
import { ChartDetail } from '../common/ChartDetail';

const App = props => {
    return (
        <div id="app">
            <BrowserRouter>
                <Route exact path="/statistics" component={Widgets} />
                <Route path="/chart/:id" component={ChartDetail} />
            </BrowserRouter>
        </div>
    );
};

ReactDOM.render(
    <App />,
    document.getElementById('root')
);