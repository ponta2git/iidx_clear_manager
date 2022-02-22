import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Scatter } from 'react-chartjs-2';

const formatData = (data) => {
    let result = {};
    let easy = data.filter(v => (v.id !== null && v.clear_lamp_id === 3));
    let clear = data.filter(v => (v.id !== null && v.clear_lamp_id === 4));
    let hard = data.filter(v => (v.id !== null && v.clear_lamp_id === 5));
    let exh = data.filter(v => (v.id !== null && v.clear_lamp_id === 6));
    let fc = data.filter(v => (v.id !== null && v.clear_lamp_id === 7));

    if (!!Object.keys(easy).length) {
        result.easy = easy.map((item, idx) => {
            return {x: item.value, y: item.clear_lamp_id};
        });
    } else {
        result.easy = [];
    }

    if (!!Object.keys(clear).length) {
        result.clear= clear.map((item, idx) => {
            return {x: item.value, y: item.clear_lamp_id};
        });
    } else {
        result.clear = [];
    }

    if (!!Object.keys(hard).length) {
        result.hard = hard.map((item, idx) => {
            return {x: item.value, y: item.clear_lamp_id};
        });
    } else {
        result.hard = [];
    }

    if (!!Object.keys(exh).length) {
        result.exh = exh.map((item, idx) => {
            return {x: item.value, y: item.clear_lamp_id};
        });
    } else {
        result.exh = [];
    }

    if (!!Object.keys(fc).length) {
        result.fc = fc.map((item, idx) => {
            return {x: item.value, y: item.clear_lamp_id};
        });
    } else {
        result.fc = [];
    }

    return result;
};

const buildSetting = (data) => {
    return {
        type: "scatter",
        data: {
            datasets: [
                {
                    label: "EASY CLEAR",
                    backgroundColor: '#48bb78',
                    data: data.easy
                },
                {
                    label: "CLEAR",
                    backgroundColor: '#4299e1',
                    data: data.clear
                },
                {
                    label: "HARD CLEAR",
                    backgroundColor: '#f56565',
                    data: data.hard
                },
                {
                    label: "EX HARD CLEAR",
                    backgroundColor: '#ecc94b',
                    data: data.exh
                },
                {
                    label: "FULL COMBO CLEAR",
                    backgroundColor: '#ed8936',
                    data: data.fc
                }
            ]
        },
        options: {
            responsive: true,
            title: {display: false},
            scales: {
                yAxes: [{
                    scaleLabel: {display: false},
                    ticks: {
                        display: false,
                        min: 2,
                        max: 8,
                        step: 1,
                    },
                    gridLines: {
                        display: false,
                        drawBorder: false
                    }
                }],
                xAxes: [{
                    scaleLabel: {display: false},
                    ticks: {
                        display: true
                    },
                    gridLines: {
                        display: true,
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

export const CpiResultsDetails = props => {
    const [graphSetting, setGraphSetting] = useState({}); 


    useEffect(() => {
        let unmount = false;
        const fetchData = async () => {
            await axios.get('/api/stats/cpiresultsdetails')
            .then((res) => {
                if (!unmount) {
                    let formatted = formatData(res.data);
                    let setting = buildSetting(formatted);
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
        <div id="cpiresultsdetails">
            <div className="box">
                <div className="box-content widget-content">
                    <h2>クリア分布(CPI)</h2>
                    <Scatter 
                        data={graphSetting.data ?? {}} 
                        options={graphSetting.options ?? {}} 
                    />
                </div>
            </div>
        </div>
    );
};