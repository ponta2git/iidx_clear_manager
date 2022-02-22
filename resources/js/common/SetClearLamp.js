import React from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

export const SetClearLamp = (props) => {
    const isClearedBest = (lamp) => {
        return props.chart.lamp === lamp;
    };
    
    const handleChangeClearLamp = (newLamp) => {
        if (props.chart.lamp >= newLamp) return;
        props.handleChangeClearLamp(newLamp);
    
        axios.post(
            '/api/clear', {
                chart_id: props.chart.chart_id,
                clear_lamp_id: newLamp,
            }
        )
        .then((response) => {
            if (!!props.setNewClearResults) {
                props.setNewClearResults(response.data);
            }
        })
        .catch((error) => {
            console.log(error);
        });
    };

    return (
        <div className="clear-lamp">
            <div onClick={() => { handleChangeClearLamp(0); }}>
                <p>N
                    {isClearedBest(0)
                    ? <><br /><FontAwesomeIcon icon={faCheckCircle} /></> : ""}</p>
            </div>
            <div onClick={() => { handleChangeClearLamp(1); }} className="lamp-failed">
                <p>F{isClearedBest(1)
                    ? <><br /><FontAwesomeIcon icon={faCheckCircle} color="white"/></> : ""}</p>
            </div>
            <div onClick={() => { handleChangeClearLamp(2); }} className="lamp-assist">
                <p>A{isClearedBest(2)
                    ? <><br /><FontAwesomeIcon icon={faCheckCircle} color="white"/></> : ""}</p>
            </div>
            <div onClick={() => { handleChangeClearLamp(3); }} className="lamp-easy">
                <p>E{isClearedBest(3)
                    ? <><br /><FontAwesomeIcon icon={faCheckCircle} color="white"/></> : ""}</p>
            </div>
            <div onClick={() => { handleChangeClearLamp(4); }} className="lamp-clear">
                <p>C{isClearedBest(4)
                    ? <><br /><FontAwesomeIcon icon={faCheckCircle} color="white"/></> : ""}</p>
            </div>
            <div onClick={() => { handleChangeClearLamp(5); }} className="lamp-hard">
                <p>H{isClearedBest(5)
                    ? <><br /><FontAwesomeIcon icon={faCheckCircle} color="white"/></> : ""}</p>
            </div>
            <div onClick={() => { handleChangeClearLamp(6); }} className="lamp-exh">
                <p>EXH{isClearedBest(6)
                    ? <><br /><FontAwesomeIcon icon={faCheckCircle} color="white"/></> : ""}</p>
            </div>
            <div onClick={() => { handleChangeClearLamp(7); }} className="lamp-fc">
                <p>FC{isClearedBest(7)
                    ? <><br /><FontAwesomeIcon icon={faCheckCircle} color="white"/></> : ""}</p>
            </div>
        </div>
    );

};