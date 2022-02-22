import React from 'react';
import { ClearLampDetails } from './widgets/ClearLampDetails';
import { ClearResultsChanges } from './widgets/ClearResultsChanges';
import { CpiResultsDetails } from './widgets/CpiResultsDetails';
import { RecommendCharts } from './widgets/RecommendCharts';
import { DanILamps } from './widgets/DanILamps';

export const Widgets = props => {
    return (
        <div className="widgets-guide">
            <ClearLampDetails />
            <div className="widget-2">
                <ClearResultsChanges />
                <DanILamps />
            </div>
            <CpiResultsDetails />
            <RecommendCharts />
        </div>
    );
};