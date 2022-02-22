import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const getBorderColor = (lamp, prefix) => {
    let result = prefix + " ";

    switch (lamp) {
        case 0: return result + "recent-noplay";
        case 1: return result + "recent-failed";
        case 2: return result + "recent-assist";
        case 3: return result + "recent-easy";
        case 4: return result + "recent-clear";
        case 5: return result + "recent-hard";
        case 6: return result + "recent-exh";
        case 7: return result + "recent-fc";
    }
};

const getHistoryContent = (lamp) => {
    switch (lamp) {
        case 0: return "NO PLAY";
        case 1: return "FAILED";
        case 2: return "ASSIST CLEAR";
        case 3: return "EASY CLEAR";
        case 4: return "CLEAR";
        case 5: return "HARD CLEAR";
        case 6: return "EX HARD CLEAR";
        case 7: return "FULL COMBO CLEAR";
    }
};

export const ClearHistory = (props) => {
    const handleDeleteHistory = (id, chart_id) => {
        axios.post(
            '/api/clear/delete', {
                chart_id: chart_id,
                id: id,
            }
        )
        .then(response => {
            props.handleDeleteHistory(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    let myDate = moment(props.history.created_at);
    return (
        <div className="histories">
            <div className="history">
                <div className="date-container">
                    <div className={getBorderColor(props.history.lamp, "date")}>
                        <div className="date-year">
                            <p>{myDate.format('YYYY')}</p>
                        </div>
                        <div className="date-day">
                            <p>{myDate.format('MM/DD')}</p>
                        </div>
                    </div>
                </div>
                <div className={getBorderColor(props.history.lamp, "content-container")}>
                    <div className="content-header">
                        <div className="date-time">
                            <p>{myDate.format('HH:mm')}</p>
                        </div>
                        <div className="delete-button">
                            <p>
                                <a onClick={() => handleDeleteHistory(props.history.id, props.history.chart_id)}>
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                </a>
                            </p>
                        </div>
                    </div>
                    <div className="content">
                        <p>{getHistoryContent(props.history.lamp)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};