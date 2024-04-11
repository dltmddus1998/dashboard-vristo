import React, { useState, useEffect } from 'react';
import { IRootState } from '../../store';
import { useSelector } from 'react-redux';
import ReactApexChart from 'react-apexcharts';

interface Series {
    name: string;
    data: number[];
}

interface Options {
    chart: {
        height: number;
        type:
            | 'area'
            | 'line'
            | 'bar'
            | 'pie'
            | 'donut'
            | 'radialBar'
            | 'scatter'
            | 'bubble'
            | 'heatmap'
            | 'candlestick'
            | 'radar'
            | 'polarArea'
            | 'rangeBar'
            | 'treemap'
            | 'boxPlot'
            | 'rangeArea'
            | undefined;
        fontFamily: string;
        zoom: {
            enabled: boolean;
        };
        toolbar: {
            show: boolean;
        };
    };
    dataLabels: {
        enabled: boolean;
    };
    stroke: {
        show: boolean;
        curve: string;
        width: number;
        lineCap: string;
    };
    dropShadow: {
        enabled: boolean;
        opacity: number;
        blur: number;
        left: number;
        top: number;
    };
    colors: {
        dark: string[];
        light: string[];
    };
    markers: {
        discrete: {
            seriesIndex: number;
            dataPointIndex: number;
            fillColor: string;
            strokeColor: string;
            size: number;
        }[];
    };
    labels: string[];
    xaxis: {
        axisBorder: {
            show: boolean;
        };
        axisTicks: {
            show: boolean;
        };
        crosshairs: {
            show: boolean;
        };
        labels: {
            offsetX: {
                right: number;
                left: number;
            };
            offsetY: number;
            style: {
                fontSize: string;
                cssClass: string;
            };
        };
    };
    yaxis: {
        tickAmount: number;
        labels: {
            formatter: (value: number) => string;
            offsetX: number;
            offsetY: number;
            style: {
                fontSize: string;
                cssClass: string;
            };
        };
        opposite: boolean;
    };
    grid: {
        borderColor: {
            dark: string;
            light: string;
        };
        strokeDashArray: number;
        xaxis: {
            lines: {
                show: boolean;
            };
        };
        yaxis: {
            lines: {
                show: boolean;
            };
        };
        padding: {
            top: number;
            right: number;
            bottom: number;
            left: number;
        };
    };
    legend: {
        position: string;
        horizontalAlign: string;
        fontSize: string;
        markers: {
            width: number;
            height: number;
            offsetX: number;
        };
        itemMargin: {
            horizontal: number;
            vertical: number;
        };
    };
    tooltip: {
        marker: {
            show: boolean;
        };
        x: {
            show: boolean;
        };
    };
    fill: {
        type: string;
        gradient: {
            shadeIntensity: number;
            inverseColors: boolean;
            opacityFrom: {
                dark: number;
                light: number;
            };
            opacityTo: number;
            stops: {
                dark: number[];
                light: number[];
            };
        };
    };
}

interface ChartData {
    series: Series[];
    options: Options;
}

const Flowchart = () => {
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [loading, setLoading] = useState(false);
    const [chartData, setChartData] = useState<ChartData>({
        series: [],
        options: {
            chart: {
                height: 0,
                type: 'area',
                fontFamily: 'inherit',
                zoom: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: false,
                curve: '',
                width: 0,
                lineCap: '',
            },
            dropShadow: {
                enabled: false,
                opacity: 0,
                blur: 0,
                left: 0,
                top: 0,
            },
            colors: {
                dark: [],
                light: [],
            },
            markers: {
                discrete: [],
            },
            labels: [],
            xaxis: {
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
                crosshairs: {
                    show: false,
                },
                labels: {
                    offsetX: {
                        right: 0,
                        left: 0,
                    },
                    offsetY: 0,
                    style: {
                        fontSize: '',
                        cssClass: '',
                    },
                },
            },
            yaxis: {
                tickAmount: 0,
                labels: {
                    formatter: function (value: number): string {
                        throw new Error('Function not implemented.');
                    },
                    offsetX: 0,
                    offsetY: 0,
                    style: {
                        fontSize: '',
                        cssClass: '',
                    },
                },
                opposite: false,
            },
            grid: {
                borderColor: {
                    dark: '',
                    light: '',
                },
                strokeDashArray: 0,
                xaxis: {
                    lines: {
                        show: false,
                    },
                },
                yaxis: {
                    lines: {
                        show: false,
                    },
                },
                padding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            legend: {
                position: '',
                horizontalAlign: '',
                fontSize: '',
                markers: {
                    width: 0,
                    height: 0,
                    offsetX: 0,
                },
                itemMargin: {
                    horizontal: 0,
                    vertical: 0,
                },
            },
            tooltip: {
                marker: {
                    show: false,
                },
                x: {
                    show: false,
                },
            },
            fill: {
                type: '',
                gradient: {
                    shadeIntensity: 0,
                    inverseColors: false,
                    opacityFrom: {
                        dark: 0,
                        light: 0,
                    },
                    opacityTo: 0,
                    stops: {
                        dark: [],
                        light: [],
                    },
                },
            },
        },
    });

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:3000/datas');
                const json = await response.json();
                setChartData(json.datas);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    const revenueChart = {
        series: chartData.series,
        options: {
            chart: chartData.options.chart,

            dataLabels: chartData.options.dataLabels,
            stroke: chartData.options.stroke,
            dropShadow: chartData.options.dropShadow,
            colors: isDark ? chartData.options.colors.dark : chartData.options.colors.light,
            markers: {
                discrete: chartData.options.markers.discrete,
            },
            labels: chartData.options.labels,
            xaxis: {
                ...chartData.options.xaxis,
                labels: {
                    ...chartData.options.xaxis.labels,
                    offsetX: isRtl ? chartData.options.xaxis.labels.offsetX.right : chartData.options.xaxis.labels.offsetX.left,
                },
            },
            yaxis: {
                tickAmount: chartData.options.yaxis.tickAmount,
                labels: {
                    formatter: function (value: number) {
                        return value.toFixed(0);
                    },
                    offsetX: chartData.options.yaxis.labels.offsetX,
                    offsetY: chartData.options.yaxis.labels.offsetY,
                    style: {
                        fontSize: '12px',
                        cssClass: '',
                    },
                },
            },
            grid: {
                ...chartData.options.grid,
                borderColor: isDark ? chartData.options.grid.borderColor.dark : chartData.options.grid.borderColor.light,
            },
            legend: chartData.options.legend,
            tooltip: chartData.options.tooltip,
            fill: {
                ...chartData.options.fill,
                gradient: {
                    ...chartData.options.fill.gradient,
                    opacityFrom: isDark ? chartData.options.fill.gradient.opacityFrom.dark : chartData.options.fill.gradient.opacityFrom.light,
                    opacityTo: chartData.options.fill.gradient.opacityTo,
                    stops: isDark ? chartData.options.fill.gradient.stops.dark : chartData.options.fill.gradient.stops.light,
                },
            },
        },
    };

    console.log(revenueChart);
    return (
        <div>
            {loading ? (
                <div className="min-h-[325px] grid place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] ">
                    <span className="animate-spin border-2 border-black dark:border-white !border-l-transparent  rounded-full w-5 h-5 inline-flex"></span>
                </div>
            ) : (
                <ReactApexChart series={chartData.series} options={revenueChart.options} type="area" height={325} />
            )}
        </div>
    );
};

export default Flowchart;
