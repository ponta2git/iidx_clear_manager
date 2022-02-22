import React from 'react';

export const ChartListHeader = props => {
    return (
        <div className="chart-box chart-box-header">
            <div className="chart-header">
                <p>{props.children}</p>
            </div>
        </div>
    );
}