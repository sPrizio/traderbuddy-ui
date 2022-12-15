import React, {Component} from "react";
import Chart from "react-apexcharts";
import moment from "moment";
import {CoreConstants} from "../../../constants/coreConstants";
import {options} from "../../../util/CandleStickChartConfig";
import TradeRecapCandleChartLoader from "../../loader/trade/TradeRecapCandleChartLoader";

export default class TradeRecapCandleChart extends Component {

    constructor(props) {
        super(props);

        const chartOptions = options;
        if (this.props.hideYAxis) {
            chartOptions.yaxis.show = false
        }

        if (this.props.hideXAxis) {
            chartOptions.xaxis.show = false
        }

        this.state = {
            isLoading: false,
            recapData: {
                chartData: [
                    /*{
                        name: '25 EMA',
                        type: 'line',
                        data: [
                            {
                                x: new Date(1538852400000),
                                y: [6591, 6601.32, 6585, 6592]
                            },
                            {
                                x: new Date(1538854200000),
                                y: [6593.13, 6596.01, 6590, 6593.34]
                            },
                            {
                                x: new Date(1538856000000),
                                y: [6593.34, 6604.76, 6582.63, 6593.86]
                            },
                            {
                                x: new Date(1538857800000),
                                y: [6593.86, 6604.28, 6586.57, 6600.01]
                            },
                            {
                                x: new Date(1538859600000),
                                y: [6601.81, 6603.21, 6592.78, 6596.25]
                            },
                            {
                                x: new Date(1538861400000),
                                y: [6596.25, 6604.2, 6590, 6602.99]
                            },
                            {
                                x: new Date(1538863200000),
                                y: [6602.99, 6606, 6584.99, 6587.81]
                            },
                            {
                                x: new Date(1538865000000),
                                y: [6587.81, 6595, 6583.27, 6591.96]
                            },
                            {
                                x: new Date(1538866800000),
                                y: [6591.97, 6596.07, 6585, 6588.39]
                            },
                            {
                                x: new Date(1538868600000),
                                y: [6587.6, 6598.21, 6587.6, 6594.27]
                            },
                            {
                                x: new Date(1538870400000),
                                y: [6596.44, 6601, 6590, 6596.55]
                            },
                            {
                                x: new Date(1538872200000),
                                y: [6598.91, 6605, 6596.61, 6600.02]
                            },
                            {
                                x: new Date(1538874000000),
                                y: [6600.55, 6605, 6589.14, 6593.01]
                            },
                            {
                                x: new Date(1538875800000),
                                y: [6593.15, 6605, 6592, 6603.06]
                            },
                            {
                                x: new Date(1538877600000),
                                y: [6603.07, 6604.5, 6599.09, 6603.89]
                            },
                            {
                                x: new Date(1538879400000),
                                y: [6604.44, 6604.44, 6600, 6603.5]
                            },
                            {
                                x: new Date(1538881200000),
                                y: [6603.5, 6603.99, 6597.5, 6603.86]
                            },
                            {
                                x: new Date(1538883000000),
                                y: [6603.85, 6605, 6600, 6604.07]
                            }
                        ]
                    }*/
                ],
                options: chartOptions,
            },
        }
    }


    //  GENERAL FUNCTIONS

    generatePoint(point) {

        const greenRed = point.win ? CoreConstants.CssConstants.GreenCandleColor : CoreConstants.CssConstants.RedCandleColor
        const color = point.entry ? CoreConstants.CssConstants.PrimaryColor : greenRed

        return {
            x: moment(point.x).valueOf(),
            y: point.y,
            marker: {
                size: 6,
                fillColor: '#ffffff',
                strokeColor: color,
                strokeWidth: 3,
                shape: 'circle',
                cssClass: ''
            },
            label: {
                borderColor: 'transparent',
                borderWidth: 1,
                borderRadius: 2,
                text: point.label,
                textAnchor: 'end',
                style: {
                    background: 'transparent',
                    color: color,
                    fontFamily: CoreConstants.CssConstants.PrimaryFont,
                    cssClass: '',
                    fontSize: '14px',
                    fontWeight: 900,
                },
                offsetX: point.entry ? 50 : 45,
                offsetY: 19,
            }
        }
    }

    async getRecap() {
        try {
            this.setState({isLoading: true})
            const response = await fetch(
                CoreConstants.ApiUrls.Trade.Recap
                    .replace('{tradeId}', this.props.tradeId)
            )

            const data = await response.json()
            const cd = []
            const points = []

            if (data.data && data.data.entries && data.data.entries.length > 0) {
                data.data.entries.forEach(entry => {
                    cd.push({
                        x: new Date(moment(entry.datetime).add(data.data.offset, 'hours').valueOf()),
                        y: [entry.open, entry.high, entry.low, entry.close]
                    })
                })
            }

            if (data.data && data.data.points && data.data.points.length > 0) {
                data.data.points.forEach(point => {
                    points.push(this.generatePoint(point))
                })
            }

            this.setState({
                recapData: {
                    date: data.data.date,
                    product: data.data.product,
                    symbol: data.data.symbol,
                    chartData: [
                        {
                            name: 'Price',
                            type: 'candlestick',
                            data: cd
                        }
                    ],
                    options: {
                        ...this.state.recapData.options,
                        annotations: {
                            points: points
                        }
                    }
                }
            })
        } catch (e) {
            console.log(e)
        }

        this.setState({
            isLoading: false,
        })
    }


    //  RENDER

    render() {
        let loader = null
        if (this.state.isLoading) {
            loader = <TradeRecapCandleChartLoader count={5} isLoading={this.state.isLoading}/>
        }

        return (
            <div className="trade-recap">
                <div className="card">
                    <div className="card-content">
                        {loader}
                        <div className={"" + (this.state.isLoading ? ' no-show ' : '')}>
                            <h5 className="header">{this.state.recapData.product} | {this.state.recapData.symbol}</h5>
                            <h6 className="sub-header">{moment(this.state.recapData.date).format(CoreConstants.DateTime.ISOLongMonthDayYearFormat)}</h6>
                            <div className="chart-container">
                                {
                                    this.state.recapData.chartData && this.state.recapData.chartData.length > 0 ?
                                        <Chart
                                            series={this.state.recapData.chartData}
                                            options={this.state.recapData.options}
                                            type="candlestick"
                                            height={"100%"} width={"100%"}
                                        />
                                        :
                                        null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


    //  LIFECYCLE FUNCTIONS

    async componentDidMount() {
        await this.getRecap()
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.tradeId !== this.props.tradeId) {
            await this.getRecap()
        }
    }
}