import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import moment from 'moment';

const formatData = (data) => {
    let now = moment().date(1);
    let now_str = now.format('YYYY-MM');
    let three_months_ago = now.subtract(3, 'months');
    let res_str = "";
    let month_ptr = three_months_ago;

    let proceedMonth = function* () {
        do {
            month_ptr = month_ptr.add(1, 'months');
            res_str = month_ptr.format('YYYY-MM');
            yield res_str;
        } while ( res_str !== now_str );
    };
    
    let months = proceedMonth();

    let result = [];
    for (const month of months) {
        let item = data.find(v => v.month === month);
        if (!!item) {
            result.push({month: month, count: item.count});
        } else {
            result.push({month: month, count: 0});
        }
    }

    return result;
};

const buildSetting = (data) => {
    return {
        type: "line",
        data: {
            labels: [data[0].month, data[1].month, data[2].month],
            datasets: [
                {
                    fill: 'origin',
                    borderColor: '#e9d8fd',
                    backgroundColor: '#faf5ff',
                    data: [data[0].count, data[1].count, data[2].count]
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            elements: {
                point: {
                    radius: 0
                }
            },
            title: {display: false},
            scales: {
                yAxes: [{
                    scaleLabel: {display: false},
                    ticks: {
                        suggestedMin: 0,
                        suggestedMax: 100,
                        display: false
                    },
                    gridLines: {
                        display: false,
                        drawBorder: false
                    }
                }],
                xAxes: [{
                    scaleLabel: {display: false},
                    ticks: {display: false},
                    gridLines: {
                        display: false,
                        drawBorder: false
                    }
                }]
            },
            legend: {
                display: false
            },
            tooltips: {
                enabled: false
            }
        }
    };
};

const setSubNumberStyle = (data) => {
    let result = "sub-number";
    if (!!!Object.keys(data).length) return result;

    if (data[2].count / data[1].count - 1 < 0) return result + " minus-num";
    else return result + " plus-num";
} ;

export const ClearResultsChanges = props => {
    const [formattedData, setFormattedData] = useState([]);
    const [graphSetting, setGraphSetting] = useState({}); 
    
    useEffect(() => {
        let unmount = false;
        const fetchData = async () => {
            await axios.get('/api/stats/clearresultschanges')
            .then((res) => {
                if (!unmount) {
                    let formatted = formatData(res.data);
                    let setting = buildSetting(formatted);
                    setFormattedData(formatted);
                    setGraphSetting(setting);
                }
            }).catch(err => {
                console.log(err);
            });
        };

        const cleanUp = () => {
            unmount = true;
        };

        fetchData();

        return cleanUp;

    },[]);

    return (
        <div id="clearresultschanges" className="box widget-half">
            <div id="clearresultschanges-graph">
                <Line
                    data={graphSetting.data ?? {}}
                    options={graphSetting.options ?? {}}
                    height={100}
                 />
            </div>
            <div className="box-content widget-content">
                <h2>月ランプ更新数</h2>
                <div className="number-content">
                    <div className="main-number">
                        <p>{!!Object.keys(formattedData).length ? formattedData[2].count : null}</p>
                    </div>
                    <div className={setSubNumberStyle(formattedData)}>
                        <p>{!!Object.keys(formattedData).length
                                ? Math.round(
                                    formattedData[2].count / formattedData[1].count * 100, -2)
                                     - 100
                                : null} %</p>
                    </div>
                </div>
            </div>
        </div>
    );
};