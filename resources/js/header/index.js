import React from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faEdit, faChartPie } from '@fortawesome/free-solid-svg-icons';

const App = props => {
    return (
        <div id="header">
            <div className="header-top">
                <h1>IIDX Level 12 Clear Checker</h1>
                <div>
                    <p><a href="/setting"><FontAwesomeIcon icon={faUserCircle} /></a></p>
                </div>
            </div>
            <div className="header-bottom">
                <nav>
                    <ul>
                        <li><a href="/scores" className="with-icon"><FontAwesomeIcon icon={faEdit} /> スコア登録</a></li>
                        <li><a href="/statistics" className="with-icon"><FontAwesomeIcon icon={faChartPie} /> 統計</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

ReactDOM.render(
    <App />,
    document.getElementsByTagName('header')[0]
);