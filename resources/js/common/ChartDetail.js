import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleLeft, faCalendarPlus } from '@fortawesome/free-solid-svg-icons';

import { SetClearLamp } from './SetClearLamp';
import { ClearHistory } from './chartDetail/ClearHistory';
import { BarometerView } from './chartDetail/BarometerView';

export const ChartDetail = props => {
    const [chartData, setChartData] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        let unmounted = false;
        const fetchChartData = async () => {
            await axios.get('/api/chart', {
                params: {
                    chart_id: props.match.params.id
                }
            }).then((res) => {
                if (!unmounted) {
                    setChartData(res.data);
                }
            }).catch((err) => {
                console.log(err);
            });
        };

        fetchChartData();
        setIsLoaded(true);
        
        
        const cleanup = () => {
            unmounted = true;
        }
        return cleanup;

    }, []);

    const handleClickBack = (e) => {
        window.history.back();
    };

    const [activeTab, setActiveTab] = useState("set");
    const handleChangeActiveTab = (e) => {
        e.persist();
        switch (e.target.dataset.setting_type) {
            case "set":
                setActiveTab("set");
                return;
            case "history":
                setActiveTab("history");
                return;
            case "barometer":
                setActiveTab("barometer");
                return;
        }
    };

    const handleDeleteHistory = (newHistory) => {
        setChartData(prevState => {
            let newState = prevState;
            newState.clear_results = newHistory;
            return Object.assign({}, newState);
        });
    }

    const handleChangeClearLamp = (newLamp) => {
        ;
    };

    const setNewClearResults = (newClearResults) => {
        setChartData(prevState => {
            let newState = prevState;
            newState.clear_results = newClearResults;
            return Object.assign({}, newState);
        });
    }

    const lastUpdated = () => {
        let defaultDate = '----/--/-- --:--:--';
        if (!!!Object.keys(chartData).length) return defaultDate;
        if (!!!Object.keys(chartData.clear_results).length)　return defaultDate;

        return moment(chartData.clear_results[0].created_at).format('YYYY/MM/DD HH:mm:ss');
    }


    const renderSet = () => {
        return (
            <>
                <div className="lamp-date">
                    <p>{lastUpdated()}</p>
                </div>
                <SetClearLamp
                    chart={{
                        chart_id: chartData.chart_id,
                        lamp: !!chartData.clear_results
                                ? (!!chartData.clear_results[0] ? chartData.clear_results[0].clear_lamp_id : 0)
                                : 0
                    }}
                    handleChangeClearLamp={handleChangeClearLamp}
                    setNewClearResults={setNewClearResults}
                />
            </>
        );
    }

    const renderHistory = (history, idx) => {
        return <ClearHistory
                    history={{
                        chart_id: history.chart_id,
                        id: history.id,
                        lamp: history.clear_lamp_id,
                        created_at: history.created_at,
                    }}
                    key={idx}
                    handleDeleteHistory={handleDeleteHistory}
                />;
    }    

    const renderBarometer = () => {
        return <BarometerView
                    chart={{
                        lamp: !!chartData.clear_results
                                ? (!!chartData.clear_results[0] ? chartData.clear_results[0].clear_lamp_id : 0)
                                : 0,
                        abilities: chartData.abilities,
                        cpis: chartData.cpis
                    }}
                />;
    }


    return (
    isLoaded ? 
    <>
    <div className="box">
        <div className="box-content">
            <h2>{chartData.name}</h2>
            <p className="chart-aside with-icon">
                <FontAwesomeIcon icon={faCalendarPlus} /> {chartData.version}
            </p>
        </div>
    </div>
    <div className="box">
        <div className="box-content">
            <ul className="tab">
                <li className={activeTab === "set" ? "tab-active" : "tab-inactive"}>
                    <a
                        className={activeTab === "set" 
                        ? "tab-active-content" : "tab-inactive-content"}
                        onClick={handleChangeActiveTab}
                        data-setting_type="set">
                    更新
                    </a>
                </li>
                <li className={activeTab === "history" ? "tab-active" : "tab-inactive"}>
                    <a
                        className={activeTab === "history"
                        ? "tab-active-content" : "tab-inactive-content"}
                        onClick={handleChangeActiveTab}
                        data-setting_type="history">
                    履歴
                    </a>
                </li>
                <li className={activeTab === "barometer" ? "tab-active" : "tab-inactive"}>
                    <a
                        className={activeTab === "barometer"
                        ? "tab-active-content" : "tab-inactive-content"}
                        onClick={handleChangeActiveTab}
                        data-setting_type="barometer">
                    指標
                    </a>
                </li>
            </ul>
            <div className="tab-content">
                {activeTab === "set" ? renderSet() : ""}
                {activeTab === "history" ? 
                    ( !!Object.keys(chartData.clear_results).length ?
                    chartData.clear_results.map(renderHistory) : null ) : null}
                {activeTab === "barometer" ? renderBarometer() : null}
            </div>
            

            <div className="form-buttons">
                <p>
                    <a className="with-icon" onClick={handleClickBack}>
                        <FontAwesomeIcon icon={faAngleDoubleLeft} /> back&nbsp;
                    </a>
                </p>
            </div>
        </div>
    </div>
    </>
    : <div id="loading"><p>Loading...</p></div> ) 
};