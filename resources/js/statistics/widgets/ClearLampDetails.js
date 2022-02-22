import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { HorizontalBar } from 'react-chartjs-2';

const getLampTitle = idx => {
    switch(idx) {
        case 0: return "N";
        case 1: return "F";
        case 2: return "A";
        case 3: return "E";
        case 4: return "C";
        case 5: return "H";
        case 6: return "EXH";
        case 7: return "FC";
    }
};

const getLampColor = (lamp) => {
    switch (lamp) {
        case 1: return ' lamp-failed';
        case 2: return ' lamp-assist';
        case 3: return ' lamp-easy';
        case 4: return ' lamp-clear';
        case 5: return ' lamp-hard';
        case 6: return ' lamp-exh';
        case 7: return ' lamp-fc';
        default: return '';
    }
};

const formatData = (data) => {
    let tmp = [];

    tmp[0] = 0;

    for (let i = 0; i <= 7; ++i) {
        let item = data.find(v => v.cl_id === i);
        if (!!item) {
            tmp[i] = item.count;
        } else {
            tmp[i] = 0;
        }
    }

    let item_zero = data.find(v => v.cl_id === null);
    if (!!item_zero) tmp[0] += item_zero.count;

    let total = tmp.reduce((acc, cur) => {return acc + cur;}, 0);
    return [tmp, total];
};

const buildSetting = (data, total) => {
    return {
        type: "horizontal_bar",
        data: {
            label: "クリアランプ",
            datasets: [
                {
                    label: "NO PLAY",
                    backgroundColor: '#fffaf0',
                    data: [data[0]]
                },
                {
                    label: "FAILED",
                    backgroundColor: '#a0aec0',
                    data: [data[1]]
                },
                {
                    label: "ASSIST CLEAR",
                    backgroundColor: '#9f7aea',
                    data: [data[2]]
                },
                {
                    label: "EASY CLEAR",
                    backgroundColor: '#48bb78',
                    data: [data[3]]
                },
                {
                    label: "CLEAR",
                    backgroundColor: '#4299e1',
                    data: [data[4]]
                },
                {
                    label: "HARD CLEAR",
                    backgroundColor: '#f56565',
                    data: [data[5]]
                },
                {
                    label: "EX HARD CLEAR",
                    backgroundColor: '#ecc94b',
                    data: [data[6]]
                },
                {
                    label: "FULL COMBO CLEAR",
                    backgroundColor: '#ed8936',
                    data: [data[7]]
                }
            ]
        },
        options: {
            responsive: true,
            title: {display: false},
            scales: {
                yAxes: [{
                    stacked: true,
                    xbarThickness: 5,
                    scaleLabel: {display: false},
                    ticks: {
                        min: 0,
                        max: total,
                        stepSize: 1,
                        display: false
                    },
                    gridLines: {
                        display: false,
                        drawBorder: false
                    }
                }],
                xAxes: [{
                    stacked: true,
                    scaleLabel: {display: false},
                    ticks: {
                        display: false
                    },
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

export const ClearLampDetails = props => {
    const [graphSetting, setGraphSetting] = useState({}); 
    const [formattedData, setFormattedData] = useState([]);
    const [totalData, setTotalData] = useState(0);

    useEffect(() => {
        let unmount = false;
        const fetchData = async () => {
            await axios.get('/api/stats/clearlampdetails')
            .then((res) => {
                if (!unmount) {
                    let formatted, total;
                    [formatted, total] = formatData(res.data);
                    let setting = buildSetting(formatted, total);
                    setGraphSetting(setting);
                    setFormattedData(formatted);
                    setTotalData(total);
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
        <div id="clearlampdetails">
            <div className="box">
                <div id="clearlampdetails-graph">
                    <HorizontalBar
                        data={graphSetting.data ?? {}}
                        options={graphSetting.options ?? {}}
                        height={16} />
                </div>
                <div className="box-content widget-content">
                    <h2>クリアランプ</h2>
                    <div className="lamp-info">
                        <div className="lampdetails">
                            { !!Object.keys(formattedData).length
                            ? formattedData.map((item, idx) => {
                                return (
                                    <div className="everylamp" key={idx}>
                                        <div className={"lamp-title" + getLampColor(idx)}>
                                            <p>{getLampTitle(idx)}</p>
                                        </div>
                                        <div className="lamp-count">
                                            <p>{item}</p>
                                        </div>
                                    </div>
                                );
                            })
                            : ""}
                        </div>
                        <div className="lamptotal">
                            <p className="cleared">
                                {!!totalData && !!Object.keys(formattedData).length
                                ? (formattedData[2] + formattedData[3]
                                     + formattedData[4] + formattedData[5]
                                      + formattedData[6] + formattedData[7])
                                : ""}
                                </p>
                            <p className="total">/ {totalData}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};