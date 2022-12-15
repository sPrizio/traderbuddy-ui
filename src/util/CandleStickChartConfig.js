import moment from "moment/moment";
import {formatNumberForDisplay} from "../service/FormattingService";
import {CoreConstants} from "../constants/coreConstants";
import React from "react";

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
    tooltip: {
        custom: function({ series, seriesIndex, dataPointIndex, w }) {
            const date = w.config.series[seriesIndex].data[dataPointIndex].x
            const data = w.config.series[seriesIndex].data[dataPointIndex].y

            return (
                "<div class='card' style='max-width: 200px'>" +
                    "<div class='card-content'>" +
                        "<h5 class='header'>" + moment(date).format('HH:mm') + "</h5>" +
                        "<div class='columns is-multiline is-mobile is-gapless'>" +
                            "<div class='column is-6 has-text-left sub-header'>Open:</div><div class='column is-6 has-text-right'>" + formatNumberForDisplay(data[0]) + "</div>" +
                            "<div class='column is-6 has-text-left sub-header'>High:</div><div class='column is-6 has-text-right'>" + formatNumberForDisplay(data[1]) + "</div>" +
                            "<div class='column is-6 has-text-left sub-header'>Low:</div><div class='column is-6 has-text-right'>" + formatNumberForDisplay(data[2]) + "</div>" +
                            "<div class='column is-6 has-text-left sub-header'>Close:</div><div class='column is-6 has-text-right'>" + formatNumberForDisplay(data[3]) + "</div>" +
                    "</div>" +
                "</div>"
            );
        }
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
    },
    annotations: {
        points: []
    }
}

export {chartAxisStyle, chartTitleStyle, options};
