import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const getLamp = (lamp_id, prefix) => {
    switch (lamp_id) {
        case 3: return prefix + " lamp-easy";
        case 4: return prefix + " lamp-clear";
        case 5: return prefix + " lamp-hard";
        case 6: return prefix + " lamp-exh";
        case 7: return prefix + " lamp-fc";
        default: return prefix;
    }
};

const getNowLamp = (lamp_id) => {
    return getLamp(lamp_id, "now-lamp");
}

const getTryLamp = (lamp_id) => {
    return getLamp(lamp_id, "try-lamp");
}

export const RecommendCharts = props => {
    const [chartData, setChartData] = useState([]);
    useEffect(() => {
        let unmount = false;
        const fetchData = async () => {
            await axios.get('/api/stats/recommendcharts')
            .then((res) => {
                if (!unmount) {
                    setChartData(res.data);
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
        <div id="recommendcharts">
            <div className="box">
                <div className="box-content widget-content">
                    <h2>本日の挑戦曲(experimental)</h2>
                    {!!Object.keys(chartData).length
                    ? chartData.map((chart, idx) => {
                           return <div className="recommend" key={idx}>
                                <div className="recommend-chart">
                                    <p>
                                        <NavLink
                                            to={"/chart/" + chart.chart_id}
                                            activeClassName="with-icon">
                                                {chart.name}
                                        </NavLink>
                                    </p>   
                                </div>
                                <div className={getNowLamp(chart.my_lamp_id)}>
                                </div>
                                <div className="try-arrow">
                                <p><FontAwesomeIcon icon={faArrowRight} /></p> 
                                </div>
                                <div className={getTryLamp(chart.goal_lamp_id)}>
                                </div>
                           </div>;
                        })
                    : null}
                </div>
            </div>
        </div>
    );
};