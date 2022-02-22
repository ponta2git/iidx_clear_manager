import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { SetClearLamp } from '../common/SetClearLamp';

const setLamp = (lamp) => {
    switch (lamp) {
        case 1: return 'lamp lamp-failed';
        case 2: return 'lamp lamp-assist';
        case 3: return 'lamp lamp-easy';
        case 4: return 'lamp lamp-clear';
        case 5: return 'lamp lamp-hard';
        case 6: return 'lamp lamp-exh';
        case 7: return 'lamp lamp-fc';
        default: return 'lamp';
    }
};

export const Chart = React.memo((props) => {
    const [showDetail, setShowDetail] = useState(false);
    const handleClickChartName = () => {
        setShowDetail(!showDetail);
    };

    const handleChangeClearLamp = (newLamp) => {
        if (!!props.closeAfter) {
            setShowDetail(!showDetail);
        }

        props.handleChangeClearLamp(props.idx, newLamp);
    }

    const history = useHistory();
    const handleClickChartDetail = () => {
        props.setScrollPosition();
        history.push('/chart/' + props.chart.chart_id);
    };

    return (
        <div className="chart-box">
            <div className="chart-excerpt" onClick={handleClickChartName}>
                <div className={setLamp(props.chart.clear_lamp_id)}></div>
                <div className="chart-info">
                    <p className="chart-name">
                        {props.chart.chart_name}
                    </p>
                </div>
                <div className="carets">
                    { showDetail
                        ? <FontAwesomeIcon icon={faCaretUp} />
                        : <FontAwesomeIcon icon={faCaretDown} /> }
                </div>
            </div>
            { showDetail 
                ? <div className="my_lamp">
                    <SetClearLamp
                        chart={{
                            chart_id: props.chart.chart_id,
                            lamp: props.chart.clear_lamp_id,
                        }}
                        handleChangeClearLamp={handleChangeClearLamp}
                    />
                    <div className="for-detail">
                        <p>
                            <a
                                className="with-icon"
                                onClick={handleClickChartDetail}>
                                    詳細 <FontAwesomeIcon icon={faAngleDoubleRight} />
                            </a>     
                        </p>
                    </div>
                </div>
                : null }
        </div>
        )
});