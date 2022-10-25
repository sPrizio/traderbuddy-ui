import moment from "moment/moment";
import {formatNumberForDisplay} from "../service/FormattingService";

const tbFontFamily = '"Public Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif'

const chartAxisStyle = {
    colors: ['rgb(161, 172, 184)'],
    fontFamily: tbFontFamily,
    fontSize: '12.75px',
}

const chartTitleStyle = {
    color: 'rgb(86, 106, 127)',
    fontFamily: tbFontFamily,
    fontSize: '16px',
    fontWeight: '500'
}

const options = {
    chart: {
        type: 'candlestick',
    },
    grid: {
        show: false,
    },
    legend: {
      show: false
    },
    plotOptions: {
        candlestick: {
            colors: {
                upward: 'rgb(113, 221, 55)',
                downward: 'rgb(255, 62, 29)'
            }
        }
    },
    stroke: {
        width: [1, 5],
        colors: ['rgb(100, 100, 250)', '#ff80ab'],
        curve: 'smooth'
    },
    title: {
        text: 'Nasdaq 100 Cash',
        align: 'left',
        style: chartTitleStyle
    },
    tooltip: {
        followCursor: true,
        marker: {
            show: false
        },
        onDatasetHover: {
            highlightDataSeries: true,
        },
        shared: true
    },
    xaxis: {
        type: 'datetime',
        labels: {
            formatter: function (val) {
                return moment(val).format('HH:mm')
            },
            style: chartAxisStyle
        },
        tooltip: {
            enabled: false
        },
    },
    yaxis: {
        axisBorder: {
            show: true
        },
        tooltip: {
            enabled: false
        },
        labels: {
            formatter: function (val) {
                return formatNumberForDisplay(val)
            },
            style: chartAxisStyle
        },
    }
}

export {chartAxisStyle, chartTitleStyle, options};
