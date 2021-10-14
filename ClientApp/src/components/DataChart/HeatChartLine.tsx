import React, {useEffect, useRef, useState} from "react";
import {Line, Pie, Scatter} from "react-chartjs-2/dist";
import {ISettingForChanging, LineConsumersSettingsName} from "../../types/heatData/lineConsumersSettings";


interface TLineInjects { // Настройки для Line компонента
    axisTitle?: {
        x?: string,
        y?: string
    },
    needStacked?: boolean,
    needFill?: boolean,
    offRound?: boolean,
    dateTime?: boolean,
    borderWidth?: number
}

interface Prop {
    loading: boolean,
    dataChart?: any,
    updateChartSettingsUser: any,
    chartName: LineConsumersSettingsName,
    lineInjects?: TLineInjects // Кастомные настройки для Line компонента
}

const MEDIA_SMALL = 690
const lineInjectsDefault = {
    offRound: false,
    needFill: false,
    needStacked: false,
    dateTime: false,
    borderWidth: 1,
    axisTitle: {x: '', y: ''}
}

export const HeatChartLine: React.FC<Prop> = prop => {
    const chartRef = useRef(null)
    const {loading, dataChart, updateChartSettingsUser, chartName, lineInjects = lineInjectsDefault,} = prop

    return (
        <div style={{marginTop: 50, marginBottom: 50}}>
            <Line ref={chartRef} data={(loading || !dataChart) ? [] : dataChart} options={getObjOptions()}/>
        </div>
    )

    function getObjOptions() {
        return {
            onResize: function (e: any) {
                if (e.width >= MEDIA_SMALL) {
                    e.config._config.options.aspectRatio = 2
                } else {
                    e.config._config.options.aspectRatio = 1.1
                    // e.config._config.data.dataset = 0
                }
            },
            plugins: {
                plugins: {
                    filler: {
                        propagate: true,
                    },
                },
                legend: {
                    labels: {
                        boxWidth: 20,
                        padding: 5,
                        textAlign: 'right',
                    },
                    lineCap: 'round',
                    position: 'top',
                    onHover: function (e: any) {
                        e.native.target.style.cursor = 'pointer';
                    },
                    onLeave: function (e: any) {
                        e.native.target.style.cursor = 'default';
                    },
                    onClick: (e: React.BaseSyntheticEvent<EventTarget>, legendItem: any) => {

                        const settingForChanging: ISettingForChanging = {
                            ChartName: chartName,
                            datasetIndex: legendItem.datasetIndex,
                            settings: {hidden: !legendItem.hidden}
                        }
                        updateChartSettingsUser(settingForChanging)
                    },
                },
            },
            elements: {
                line: {
                    fill: lineInjects.needFill && lineInjects.needFill || false,
                },
                point: {
                    radius: 1
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    display: true,
                    type: lineInjects.dateTime && 'category' || 'linear',
                    title: {
                        display: true,
                        text: lineInjects.axisTitle && lineInjects.axisTitle.x && lineInjects.axisTitle.x || "",
                        color: '#a3a3a3',
                        font: {
                            family: 'Roboto',
                            size: 16,
                            lineHeight: 2,
                        },
                    },
                },
                y: {
                    stacked: lineInjects.needStacked,
                    beginAtZero: true,
                    type: 'linear',
                    title: {
                        display: true,
                        text: lineInjects.axisTitle && lineInjects.axisTitle.y && lineInjects.axisTitle.y || "",
                        color: '#a3a3a3',
                        font: {
                            family: 'Roboto',
                            size: 16,
                            lineHeight: 2,
                        },
                    },
                }
            },
            borderWidth: lineInjects.borderWidth,
            responsive: true,
            interaction: {
                mode: 'point',
                intersect: false
            },
            // fill: true,
            // stacked: true
            // cubicInterpolationMode: 'monotone',
        };
    }
}


