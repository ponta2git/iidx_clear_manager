import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { specifyAbility } from '../SpecifyAbility';

const isClearedAbility = (lamp, ability) => {
    if (!!!lamp) return false;

    return lamp >= ability;
};


export const BarometerView = props => {
    const searchAbility = (lamp, type = null) => {
        const ability = props.chart.abilities.find((v) => v.clear_lamp_id === lamp);
     
        if (!!!ability) return "未登録";
        return specifyAbility(ability.value, type);
    };
    
    const searchCpi = (clear_lamp) => {
        const cpi = props.chart.cpis.find((v) => v.clear_lamp_id === clear_lamp);
    
        if (!!!cpi) return "未登録";
        return cpi.value;
    };


    return (
        <>
            <h3>地力表</h3>
            <div className="barometers">
                <div className="barometer">
                    <div className="barometer-name lamp-clear">
                        CLEAR
                    </div>
                    <div className="barometer-iscompleted">
                        {isClearedAbility(props.chart.lamp, 4) ?
                        <p><FontAwesomeIcon icon={faCheck} size="3x" color="#bee3f8" /></p>
                        : ""}
                        <div className="barometer-value">
                            <p>{searchAbility(4)}</p>
                        </div>
                    </div>
                </div>
                <div className="barometer">
                    <div className="barometer-name lamp-hard">
                        HARD
                    </div>
                    <div className="barometer-iscompleted">
                        {isClearedAbility(props.chart.lamp, 5) ?
                        <p><FontAwesomeIcon icon={faCheck} size="3x" color="#fed7d7" /></p>
                        : ""}
                        <div className="barometer-value">
                            <p>{searchAbility(5)}</p>
                        </div>
                    </div>
                </div>
                <div className="barometer">
                    <div className="barometer-name lamp-exh">
                        EXH
                    </div>
                    <div className="barometer-iscompleted">
                        {isClearedAbility(props.chart.lamp, 6) ?
                        <p><FontAwesomeIcon icon={faCheck} size="3x" color="#fefcbf" /></p>
                        : ""}
                        <div className="barometer-value">
                            <p>{searchAbility(6, "exh")}</p>
                        </div>
                    </div>
                </div>
            </div>

            <h3>CPI</h3>
            <div className="barometers">
                <div className="barometer">
                    <div className="barometer-name lamp-easy">
                        EASY
                    </div>
                    <div className="barometer-iscompleted">
                        {isClearedAbility(props.chart.lamp, 3) ?
                        <p><FontAwesomeIcon icon={faCheck} size="3x" color="#c6f6d5" /></p>
                        : ""}
                        <div className="barometer-value">
                            <p>{searchCpi(3)}</p>
                        </div>
                    </div>
                </div>
                <div className="barometer">
                    <div className="barometer-name lamp-clear">
                        CLEAR
                    </div>
                    <div className="barometer-iscompleted">
                        {isClearedAbility(props.chart.lamp, 4) ?
                        <p><FontAwesomeIcon icon={faCheck} size="3x" color="#bee3f8" /></p>
                        : ""}
                        <div className="barometer-value">
                            <p>{searchCpi(4)}</p>
                        </div>
                    </div>
                </div>
                <div className="barometer">
                    <div className="barometer-name lamp-hard">
                        HARD
                    </div>
                    <div className="barometer-iscompleted">
                        {isClearedAbility(props.chart.lamp, 5) ?
                        <p><FontAwesomeIcon icon={faCheck} size="3x" color="#fed7d7" /></p>
                        : ""}
                        <div className="barometer-value">
                            <p>{searchCpi(5)}</p>
                        </div>
                    </div>
                </div>
                <div className="barometer">
                    <div className="barometer-name lamp-exh">
                        EXH
                    </div>
                    <div className="barometer-iscompleted">
                        {isClearedAbility(props.chart.lamp, 6) ?
                        <p><FontAwesomeIcon icon={faCheck} size="3x" color="#fefcbf" /></p>
                        : ""}
                        <div className="barometer-value">
                            <p>{searchCpi(6)}</p>
                        </div>
                    </div>
                </div>
                <div className="barometer">
                    <div className="barometer-name lamp-fc">
                        FC
                    </div>
                    <div className="barometer-iscompleted">
                        {isClearedAbility(props.chart.lamp, 7) ?
                        <p><FontAwesomeIcon icon={faCheck} size="3x" color="#feebc8" /></p>
                        : ""}
                        <div className="barometer-value">
                            <p>{searchCpi(7)}</p>
                        </div>
                    </div>
                </div>
            </div>
            </>
    );
};