import React, { useEffect, useCallback, useMemo, useState, useContext } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlidersH } from '@fortawesome/free-solid-svg-icons';

import { ChartList } from './ChartList';

export const ChartListController = (props) => {
    const [needLoadCharts, setNeedLoadCharts] = useState(false);
    const handleChangeNeedLoadCharts = newStatus => {
        setNeedLoadCharts(newStatus);
    };

    const [needLoadSettings, setNeedLoadSettings] = useState(true);
    const [isLoadingSettings, setIsLoadingSettings] = useState(true);

    const [settings, setSettings] = useState({});
    useEffect(() => {
        let unmounted = false;
        const fetchSettings = async () => {
            setIsLoadingSettings(true);
            await axios.get('/api/clear/settings')
                .then((res) => {
                    if (!unmounted) {
                        setSettings(res.data[0]);
                        setNeedLoadSettings(false);
                        setIsLoadingSettings(false);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        if (needLoadSettings) {
            fetchSettings();
            setNeedLoadCharts(true);
        }

        const cleanUp = () => {
            unmounted = true;
        };

        return cleanUp;
    }, [needLoadSettings]);
    
    const handleChangeCloseAfter = (e) =>  {
        setSettings(prevSettings => {
            let newSettings = { ...prevSettings,
                close_after_set_result: e.target.checked ? 1 : 0 };
            return Object.assign({}, newSettings);
        });

        axios.post(
            '/api/clear/settings', {
                close_after_set_result: e.target.checked ? 1 : 0,
            })
        .catch((error) => {
            console.log(error);
        });
    };

    const handleChangeSortType = (e) =>  {
        let value;
        let sub_value = settings.sub_sort_type;

        if (e.target.id === 'set-sort-type-ability') {
            value = 'ability';
            if (sub_value === "easy") {
                sub_value = "clear";
            } else if (sub_value === "fc") {
                sub_value = "exh";
            }
        } else if (e.target.id === 'set-sort-type-cpi') {
            value = 'cpi';
        }

        if (value === settings.sort_type) return;

        
        setSettings(prevSettings => {
            let newSettings = { ...prevSettings,
                sort_type: value,
                sub_sort_type: sub_value
            };
            return Object.assign({}, newSettings);
        });
        setNeedLoadCharts(true);

        axios.post(
            '/api/clear/settings', {
                sort_type: value,
                sub_sort_type: sub_value,
            })
        .catch((error) => {
            console.log(error);
        });
    };

    const handleChangeSubSortType = (e) =>  {
        let value;

        if (e.target.id === 'set-sub-sort-type-easy') {
            value = 'easy';
        } else if (e.target.id === 'set-sub-sort-type-clear') {
            value = 'clear';
        } else if (e.target.id === 'set-sub-sort-type-hard') {
            value = 'hard';
        } else if (e.target.id === 'set-sub-sort-type-exh') {
            value = 'exh';
        } else if (e.target.id === 'set-sub-sort-type-fc') {
            value = 'fc';
        }

        if (value === settings.sub_sort_type) return;
        
        setSettings(prevSettings => {
            let newSettings = { ...prevSettings,
                sub_sort_type: value };
            return Object.assign({}, newSettings);
        });
        setNeedLoadCharts(true);

        axios.post(
            '/api/clear/settings', {
                sub_sort_type: value,
            })
        .catch((error) => {
            console.log(error);
        });
    };

    const handleChangeSortOrder = (e) =>  {
        let value;

        if (e.target.id === 'set-sort-order-asc') {
            value = 'asc';
        } else if (e.target.id === 'set-sort-order-desc') {
            value = 'desc';
        } 

        if (value === settings.sort_order) return;
        
        setSettings(prevSettings => {
            let newSettings = { ...prevSettings,
                sort_order: value };
            return Object.assign({}, newSettings);
        });
        setNeedLoadCharts(true);

        axios.post(
            '/api/clear/settings', {
                sort_order: value,
            })
        .catch((error) => {
            console.log(error);
        });
    };

    const handleChangeFilters = (e) =>  {
        let value;

        if (e.target.id === 'set-filters-none') {
            value = 'none';
        } else if (e.target.id === 'set-filters-not-clear') {
            value = 'not-clear';
        } else if (e.target.id === 'set-filters-not-hard') {
            value = 'not-hard';
        }

        if (value === settings.filters) return; 

        setSettings(prevSettings => {
            let newSettings = { ...prevSettings,
                filters: value };    
            return Object.assign({}, newSettings);
        });
        setNeedLoadCharts(true);

        axios.post(
            '/api/clear/settings', {
                filters: value,
            })
        .catch((error) => {
            console.log(error);
        });
    };

    const [chartNameFilterText, setChartNameFilterText] = useState("");
    const handleChangeTextBoxChartNameFilter = e => {
        e.preventDefault();

        setChartNameFilterText(e.target.value.toString().toLowerCase());
    };

    const [activeTab, setActiveTab] = useState("sort");
    const handleChangeActiveTab = useCallback((e) => {
        e.persist();

        switch (e.target.dataset.setting_type) {
            case "sort":
                setActiveTab("sort");
                return;
            case "filter":
                setActiveTab("filter");
                return;
            case "etc":
                setActiveTab("etc");
        }
    }, []);

    const renderCloseAfterCheck = useMemo(() => {
        return (
            <div className="input-info">
                <input type="checkbox"
                    id="close-after-set-result"
                    name="close-after-set-result"
                    defaultChecked={settings.close_after_set_result}
                    onChange={handleChangeCloseAfter} />
                <label htmlFor="close-after-set-result">ランプの更新後、楽曲をたたむ</label>
            </div>
        );
    }, [settings.close_after_set_result]);

    const renderSortTypeSelect = useMemo(() => {
        return (
            <div className="input-info">
                ソート用指標：
                <input type="radio"
                    id="set-sort-type-ability"
                    name="set-sort-type"
                    value="ability"
                    checked={(settings.sort_type === "ability"
                            || settings.sort_type === null)} 
                    onChange={handleChangeSortType}  />
                <label htmlFor="set-sort-type-ability">地力表</label>
                &nbsp;
                <input type="radio"
                    id="set-sort-type-cpi"
                    name="set-sort-type"
                    value="cpi"
                    checked={settings.sort_type === "cpi"}
                    onChange={handleChangeSortType}  />
                <label htmlFor="set-sort-type-cpi">CPI</label>
            </div>
        );
    }, [settings.sort_type]);

    const renderSubSortTypeSelect = useMemo(() => {
        return (
            <div className="input-info">
                種類：
                { settings.sort_type === "cpi" ?
                <>
                <input type="radio"
                    id="set-sub-sort-type-easy"
                    name="set-sub-sort-type"
                    checked={(settings.sub_sort_type === "easy")} 
                    onChange={handleChangeSubSortType}  />
                    <label htmlFor="set-sub-sort-type-easy">EASY</label>
                &nbsp;
                </>
                : ""
                }
                <input type="radio"
                    id="set-sub-sort-type-clear"
                    name="set-sub-sort-type"
                    checked={(settings.sub_sort_type === "clear")
                            || (settings.sub_sort_type === null)} 
                    onChange={handleChangeSubSortType}  />
                    <label htmlFor="set-sub-sort-type-clear">CLEAR</label>
                &nbsp;
                <input type="radio"
                    id="set-sub-sort-type-hard"
                    name="set-sub-sort-type"
                    checked={(settings.sub_sort_type === "hard")} 
                    onChange={handleChangeSubSortType}  />
                    <label htmlFor="set-sub-sort-type-hard">HARD</label>
                &nbsp;
                <input type="radio"
                    id="set-sub-sort-type-exh"
                    name="set-sub-sort-type"
                    checked={(settings.sub_sort_type === "exh")} 
                    onChange={handleChangeSubSortType}  />
                    <label htmlFor="set-sub-sort-type-exh">EXH</label>
                
                { settings.sort_type === "cpi" ?
                <>
                &nbsp;
                <input type="radio"
                    id="set-sub-sort-type-fc"
                    name="set-sub-sort-type"
                    checked={(settings.sub_sort_type === "fc")} 
                    onChange={handleChangeSubSortType}  />
                    <label htmlFor="set-sub-sort-type-fc">FC</label>
                </>
                : ""
                }

            </div>
        );
    }, [settings.sort_type, settings.sub_sort_type]);

    const renderSortOrderSelect = useMemo(() => {
        return (
            <div className="input-info">
                昇降順：
                <input type="radio"
                    id="set-sort-order-asc"
                    name="set-sort-order"
                    checked={(settings.sort_order === "asc")} 
                    onChange={handleChangeSortOrder}  />
                    <label htmlFor="set-sort-order-asc">標準</label>
                &nbsp;
                <input type="radio"
                    id="set-sort-order-desc"
                    name="set-sort-order"
                    checked={(settings.sort_order === "desc")} 
                    onChange={handleChangeSortOrder}  />
                    <label htmlFor="set-sort-order-desc">逆順</label>
            </div>
        );
    }, [settings.sort_order]);

    const renderFiltersSelect = useMemo(() => {
        return (
            <div className="input-info">
                フィルタ：
                <input type="radio"
                    id="set-filters-none"
                    name="set-filters"
                    value="none"
                    checked={(settings.filters === "none"
                            || settings.filters === null)} 
                    onChange={handleChangeFilters}  />
                <label htmlFor="set-filters-none">なし</label>
                &nbsp;
                <input type="radio"
                    id="set-filters-not-clear"
                    name="set-filters"
                    value="not-clear"
                    checked={(settings.filters === "not-clear")} 
                    onChange={handleChangeFilters}  />
                <label htmlFor="set-filters-not-clear">未クリア</label>
                &nbsp;
                <input type="radio"
                    id="set-filters-not-hard"
                    name="set-filters"
                    value="not-hard"
                    checked={(settings.filters === "not-hard")} 
                    onChange={handleChangeFilters}  />
                <label htmlFor="set-filters-not-hard">未難</label>
            </div>
        );
    }, [settings.filters]);

    const renderChartNameFilter = useMemo(() => {
        return (
            <div className="input-info w-1/2">
                <label htmlFor="set-chart-name-filter">曲名フィルタ：</label>
                <input type="text"
                    id="set-chart-name-filter"
                    name="set-chart-name-filter"
                    value={chartNameFilterText}
                    onChange={handleChangeTextBoxChartNameFilter} />
            </div>
        );
    }, [chartNameFilterText]);

    return (
        <>
            {isLoadingSettings ? <p>Loading...</p> :
            <div className="box">
            <div className="box-content setting-box">
                <div className="setting-box-content">
                    <div className="setting-box-background">
                        <FontAwesomeIcon icon={faSlidersH} size="3x" />
                    </div>
                    <ul className="tab">
                        <li id="setting-sort"
                            className={activeTab === "sort" ? "tab-active" : "tab-inactive"}>
                            <a
                                className={activeTab === "sort" ? "tab-active-content" : "tab-inactive-content"}
                                onClick={handleChangeActiveTab}
                                data-setting_type="sort">
                                    ソート
                            </a>
                        </li>
                        <li id="setting-filter"
                            className={activeTab === "filter" ? "tab-active" : "tab-inactive"}>
                            <a
                                className={activeTab === "filter" ? "tab-active-content" : "tab-inactive-content"}
                                onClick={handleChangeActiveTab}
                                data-setting_type="filter">
                                    フィルタ
                            </a>
                        </li>
                        <li id="setting-etc"
                            className={activeTab === "etc" ? "tab-active" : "tab-inactive"}>
                            <a
                                className={activeTab === "etc" ? "tab-active-content" : "tab-inactive-content"}
                                onClick={handleChangeActiveTab}
                                data-setting_type="etc">
                                    その他
                            </a>
                        </li>
                    </ul>
                    <div className="tab-content">
                        {activeTab === "sort" ? renderSortTypeSelect : ""}
                        {activeTab === "sort" ? renderSubSortTypeSelect : ""}
                        {activeTab === "sort" ? renderSortOrderSelect : ""}
                        {activeTab === "filter" ? renderFiltersSelect : ""}
                        {activeTab === "filter" ? renderChartNameFilter : ""}
                        {activeTab === "etc" ? renderCloseAfterCheck : ""}
                    </div>
                </div>
            </div>
            </div>}
            
            <ChartList
                settings={{
                    sort_type: settings.sort_type,
                    sub_sort_type: settings.sub_sort_type,
                    sort_order: settings.sort_order,
                    close_after_set_result: settings.close_after_set_result
                }}
                filters={{
                    name: settings.filters,
                    text: chartNameFilterText
                }}
                needLoadCharts={needLoadCharts}
                handleChangeNeedLoadCharts={handleChangeNeedLoadCharts}
            />

        </>
    );
}
