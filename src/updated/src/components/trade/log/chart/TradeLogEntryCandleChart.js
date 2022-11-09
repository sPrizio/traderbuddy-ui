import React, {Component} from "react";
import Chart from "react-apexcharts";
import {AdvancedRealTimeChart} from "react-ts-tradingview-widgets";

export default class TradeLogEntryCandleChart extends Component {


    //  RENDER

    render() {


        return (
            <div className="chart-container">
                {
                    this.props.series && this.props.series.length > 0 ?
                        <Chart
                            options={this.props.options}
                            series={this.props.series}
                            type="candlestick"
                            height={"100%"} width={"100%"}
                        />
                        :
                        null
                }
            </div>
        );
    }
}