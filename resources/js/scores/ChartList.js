import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AppState } from './index';
import { Chart } from './Chart';
import { ChartListHeader } from './ChartListHeader';
import { specifyAbility } from '../common/SpecifyAbility';

const isVisibleChart = (filterName, filterText, lamp, chartName) => {
    let chartEditedName = chartName.toString().toLowerCase();

    if (filterName === "not-clear" && lamp > 1) return false;
    if (filterName === "not-hard" && lamp > 5) return false;
    if (!!filterText && chartEditedName.indexOf(filterText) < 0) return false;

    return true;
}

const getBarometer = (barometer, sortType) => {
    if (sortType === 'ability') {
        return barometer;
    } else { //cpi
        return Math.floor(barometer / 10) * 10;
    }
}

const getContentHeader = (memo, barometer, settings) => {
    if (settings.sort_type === 'ability') {
        return memo !== barometer ? specifyAbility(barometer, settings.sub_sort_type) : null;
    }

    //cpi
    if (memo === "") {
        if (barometer !== null && barometer !== 0) return barometer;
        return "未登録";
    }

    if (memo === null && barometer !== 0) return barometer;
    if (barometer !== Math.floor(memo / 10) * 10) return barometer;

    return null;
};


export const ChartList = React.memo((props) => {
    const [charts, setCharts] = useState([]);
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const [isLoadingCharts, setIsLoadingCharts] = useState(true);

    useEffect(() => {
        let unmounted = false;

        const fetchCharts = async () => {
            await axios.get("/api/charts", {
                params: {
                    type: props.settings.sort_type,
                    subtype: props.settings.sub_sort_type,
                    order: props.settings.sort_order
                }})
                .then((res) => {
                    if (!unmounted) {
                        setCharts(res.data);
                        setIsLoadingCharts(false);
                        props.handleChangeNeedLoadCharts(false);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        if (!isFirstLoad && props.needLoadCharts) {
            setIsLoadingCharts(true);
            fetchCharts();
        } else {
            setIsFirstLoad(false);
        }

        const cleanUp = () => {
            unmounted = true;
        };

        return cleanUp;
    }, [props.needLoadCharts]);


    const handleChangeClearLamp = (idx, newLamp) => {
        setCharts(prevCharts => {
            let newCharts = prevCharts;
            newCharts[idx].clear_lamp_id = newLamp;
            return Object.assign([], newCharts);
        });
    };
    
    const {window_y, setWindow_y} = useContext(AppState);
    const setScrollPosition = () => {
        setWindow_y(window.pageYOffset);
    };
    
    const [withPageChange, setWithPageChange] = useState(true);
    useEffect(() => {
        if (!isLoadingCharts && withPageChange) {
            window.scrollTo(0, window_y);
            setWithPageChange(false);
        }
    }, [isLoadingCharts]);

    const renderCharts = () => {
        let memo = "";

        let chartFragment = charts.map((chart, idx) => {
            const barometer = getBarometer(chart.barometer, props.settings.sort_type);
            const headerContent = getContentHeader(memo, barometer, props.settings);

            let header = null;
            if (headerContent !== null) {
                memo = chart.barometer;
                header = <ChartListHeader>{headerContent}</ChartListHeader>;
            }

            return <React.Fragment key={idx}>
                    {header}
                    { isVisibleChart(props.filters.name,
                                    props.filters.text,
                                    chart.clear_lamp_id, 
                                    chart.chart_name)
                        ? <Chart
                            key={chart.chart_id}
                            idx={idx}
                            chart={chart}
                            closeAfter={props.settings.close_after_set_result}
                            handleChangeClearLamp={handleChangeClearLamp}
                            setScrollPosition={setScrollPosition} />
                        : null}
                    </React.Fragment>;
        })

        return chartFragment;
    };

    return (
        <div className="box">
            { isLoadingCharts ? <p>Loading...</p> : renderCharts() }
        </div>
    );
});