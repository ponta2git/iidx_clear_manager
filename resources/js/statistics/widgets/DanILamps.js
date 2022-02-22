import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';

const getDanIDate = (date) => {
    if (!!!date) return null;
    
    return moment(date).format('YYYY/MM/DD〜');
}

const getDanIName = (danI) => {
    switch (danI) {
        case 1: return '皆伝';
        case 2: return '中伝';
        case 3: return '十段';
        case 4: return '九段';
        case 5: return '八段';
        default: return '段位なし';
    }
}

export const DanILamps = props => {
    const [danIInfo, setDanIInfo] = useState({});


    useEffect(() => {
        let unmount = false;
        const fetchData = async () => {
            await axios.get('/api/stats/daniexcerpts')
            .then(res => {
                if (!unmount) {
                    setDanIInfo(res.data);
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
    }, [])


    return (
        <div className="box widget-half">
            <div className="box-content widget-content">
                <h2>現在の段位</h2>
                <div className="dan_i">
                    <p>{getDanIName(danIInfo.dan_i)}</p>
                </div>
                <div className="dan_i_from">
                    <p>{getDanIDate(danIInfo.created_at) ?? "----/--/--"}</p>
                </div>
            </div>
        </div>
    );
}