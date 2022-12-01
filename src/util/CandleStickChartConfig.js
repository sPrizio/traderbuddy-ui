import moment from "moment/moment";
import {formatNumberForDisplay} from "../service/FormattingService";
import {CoreConstants} from "../constants/coreConstants";

const chartAxisStyle = {
    colors: [CoreConstants.CssConstants.FontAccentColor],
    fontFamily: CoreConstants.CssConstants.PrimaryFont,
    fontSize: CoreConstants.CssConstants.SubHeaderFontSize,
}

const chartTitleStyle = {
    color: CoreConstants.CssConstants.HeaderFontColor,
    fontFamily: CoreConstants.CssConstants.PrimaryFont,
    fontSize: CoreConstants.CssConstants.HeaderFontSize,
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
                upward: CoreConstants.CssConstants.GreenCandleColor,
                downward: CoreConstants.CssConstants.RedCandleColor
            }
        }
    },
    stroke: {
        width: [1, 5],
        colors: [CoreConstants.CssConstants.PrimaryColor, CoreConstants.CssConstants.TrendLineColor],
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
                return moment(val).format(CoreConstants.DateTime.ISOShortTimeFormat)
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
