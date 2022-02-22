import React, { createContext, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import { ChartListController } from './ChartListController';
import { ChartDetail } from '../common/ChartDetail';

export const AppState = createContext();

const App = props => {
    const [window_y, setWindow_y] = useState(0);

    return (
        <div id="app">
            <AppState.Provider value={{ window_y, setWindow_y }}>
                <BrowserRouter>
                    <Route exact path="/scores" component={ChartListController} />
                    <Route path="/chart/:id" component={ChartDetail} />
                </BrowserRouter>
            </AppState.Provider>
        </div>
    );
};

ReactDOM.render(
    <App />,
    document.getElementById('root')
);