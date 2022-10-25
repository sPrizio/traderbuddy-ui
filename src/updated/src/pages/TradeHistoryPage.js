import React, {Component} from "react";
import TradeHistoryEntry from "../components/account/tradehistory/TradeHistoryEntry";
import TradeList from "../components/account/tradehistory/TradeList";
import {AiOutlineArrowLeft} from "react-icons/ai";
import Chart from "react-apexcharts";
import {options} from "../util/CandleStickChartConfig";

export default class TradeHistoryPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedInterval: 'DAILY',
            tradeWindowActive: false,
            selectedTrade: '',

            //  format: [[Timestamp], [Open, High, Low, Close]]
            series: [
                {
                    name: 'Price',
                    type: 'candlestick',
                    data: [
                        {
                            x: new Date(1538798400000),
                            y: [6608.91, 6618.99, 6608.01, 6612]
                        },
                        {
                            x: new Date(1538800200000),
                            y: [6612, 6615.13, 6605.09, 6612]
                        },
                        {
                            x: new Date(1538802000000),
                            y: [6612, 6624.12, 6608.43, 6622.95]
                        },
                        {
                            x: new Date(1538803800000),
                            y: [6623.91, 6623.91, 6615, 6615.67]
                        },
                        {
                            x: new Date(1538805600000),
                            y: [6618.69, 6618.74, 6610, 6610.4]
                        },
                        {
                            x: new Date(1538807400000),
                            y: [6611, 6622.78, 6610.4, 6614.9]
                        },
                        {
                            x: new Date(1538809200000),
                            y: [6614.9, 6626.2, 6613.33, 6623.45]
                        },
                        {
                            x: new Date(1538811000000),
                            y: [6623.48, 6627, 6618.38, 6620.35]
                        },
                        {
                            x: new Date(1538812800000),
                            y: [6619.43, 6620.35, 6610.05, 6615.53]
                        },
                        {
                            x: new Date(1538814600000),
                            y: [6615.53, 6617.93, 6610, 6615.19]
                        },
                        {
                            x: new Date(1538816400000),
                            y: [6615.19, 6621.6, 6608.2, 6620]
                        },
                        {
                            x: new Date(1538818200000),
                            y: [6619.54, 6625.17, 6614.15, 6620]
                        },
                        {
                            x: new Date(1538820000000),
                            y: [6620.33, 6634.15, 6617.24, 6624.61]
                        },
                        {
                            x: new Date(1538821800000),
                            y: [6625.95, 6626, 6611.66, 6617.58]
                        },
                        {
                            x: new Date(1538823600000),
                            y: [6619, 6625.97, 6595.27, 6598.86]
                        },
                        {
                            x: new Date(1538825400000),
                            y: [6598.86, 6598.88, 6570, 6587.16]
                        },
                        {
                            x: new Date(1538827200000),
                            y: [6588.86, 6600, 6580, 6593.4]
                        },
                        {
                            x: new Date(1538829000000),
                            y: [6593.99, 6598.89, 6585, 6587.81]
                        },
                        {
                            x: new Date(1538830800000),
                            y: [6587.81, 6592.73, 6567.14, 6578]
                        },
                        {
                            x: new Date(1538832600000),
                            y: [6578.35, 6581.72, 6567.39, 6579]
                        },
                        {
                            x: new Date(1538834400000),
                            y: [6579.38, 6580.92, 6566.77, 6575.96]
                        },
                        {
                            x: new Date(1538836200000),
                            y: [6575.96, 6589, 6571.77, 6588.92]
                        },
                        {
                            x: new Date(1538838000000),
                            y: [6588.92, 6594, 6577.55, 6589.22]
                        },
                        {
                            x: new Date(1538839800000),
                            y: [6589.3, 6598.89, 6589.1, 6596.08]
                        },
                        {
                            x: new Date(1538841600000),
                            y: [6597.5, 6600, 6588.39, 6596.25]
                        },
                        {
                            x: new Date(1538843400000),
                            y: [6598.03, 6600, 6588.73, 6595.97]
                        },
                        {
                            x: new Date(1538845200000),
                            y: [6595.97, 6602.01, 6588.17, 6602]
                        },
                        {
                            x: new Date(1538847000000),
                            y: [6602, 6607, 6596.51, 6599.95]
                        },
                        {
                            x: new Date(1538848800000),
                            y: [6600.63, 6601.21, 6590.39, 6591.02]
                        },
                        {
                            x: new Date(1538850600000),
                            y: [6591.02, 6603.08, 6591, 6591]
                        },
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
                },
                {
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
                }
            ],
            options: options,
        };

        this.toggleTradeWindow = this.toggleTradeWindow.bind(this)
    }


    //  HANDLER FUNCTIONS

    toggleTradeWindow(val) {
        this.setState({
            tradeWindowActive: (!(this.state.tradeWindowActive && this.state.selectedTrade === val)),
            selectedTrade: (this.state.tradeWindowActive && this.state.selectedTrade === val) ? '' : val
        })
    }


    //  GENERAL FUNCTIONS

    computeDateFormat() {
        switch (this.state.selectedInterval) {
            case 'MONTHLY':
                return 'MMMM YYYY'
            case 'YEARLY':
                return 'YYYY'
            default:
                return 'MMMM Do'
        }
    }

    computeBackwardButton() {
        switch (this.state.selectedInterval) {
            case "DAILY":
                return (
                    <button className="button">
                        <span className="icon">
                            <AiOutlineArrowLeft/>
                        </span>
                        <span>2022</span>
                    </button>
                )
            case "MONTHLY":
                return (
                    <button className="button">
                        <span className="icon">
                            <AiOutlineArrowLeft/>
                        </span>
                        <span>All-time</span>
                    </button>
                )
            default:
                return null
        }
    }


    //  RENDER FUNCTION

    render() {
        let tradeWindow =
            <div className="has-text-centered">
                <p>
                    <span>Select an entry to view each trade</span>
                </p>
            </div>
        if (this.state.tradeWindowActive) {
            tradeWindow = <TradeList/>
        }

        return (
            <div className="trade-history">
                <div
                    className={"columns is-multiline is-mobile" + (!this.state.tradeWindowActive ? ' is-vcentered ' : '')}>
                    <div className="column is-6">
                        <div className="card">
                            <div className="card-content">
                                <div className="columns is-multiline is-mobile is-vcentered is-gapless">
                                    <div className="column is-6">
                                        <h5 className="header">History</h5>
                                        <h6 className="sub-header">October 2022</h6>
                                    </div>
                                    <div className="column is-6">
                                        <div className="buttons is-right">
                                            {this.computeBackwardButton()}
                                        </div>
                                    </div>
                                </div>
                                <div className="container">
                                    <div className="table-container">
                                        <table className="table is-fullwidth is-narrow hoverable-table">
                                            <thead>
                                            <tr>
                                                <th className="has-text-left">Date</th>
                                                <th className="has-text-centered">Trades</th>
                                                <th className="has-text-centered">Win %</th>
                                                <th className="has-text-centered">P & L</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <TradeHistoryEntry
                                                active={'2022-10-11' === this.state.selectedTrade}
                                                format={this.computeDateFormat()}
                                                date={'2022-10-11'}
                                                trades={18}
                                                winPercentage={56}
                                                netProfit={49.80}
                                                onClickHandler={this.toggleTradeWindow}
                                            />
                                            <TradeHistoryEntry
                                                active={'2022-10-12' === this.state.selectedTrade}
                                                format={this.computeDateFormat()}
                                                date={'2022-10-12'}
                                                trades={8}
                                                winPercentage={50}
                                                netProfit={35.49}
                                                onClickHandler={this.toggleTradeWindow}
                                            />
                                            <TradeHistoryEntry
                                                active={'2022-10-13' === this.state.selectedTrade}
                                                format={this.computeDateFormat()}
                                                date={'2022-10-13'}
                                                trades={12}
                                                winPercentage={83}
                                                netProfit={48.80}
                                                onClickHandler={this.toggleTradeWindow}
                                            />
                                            <TradeHistoryEntry
                                                active={'2022-10-14' === this.state.selectedTrade}
                                                format={this.computeDateFormat()}
                                                date={'2022-10-14'}
                                                trades={16}
                                                winPercentage={62}
                                                netProfit={-64.13}
                                                onClickHandler={this.toggleTradeWindow}
                                            />
                                            <TradeHistoryEntry
                                                active={'2022-10-17' === this.state.selectedTrade}
                                                format={this.computeDateFormat()}
                                                date={'2022-10-17'}
                                                trades={6}
                                                winPercentage={100}
                                                netProfit={83.67}
                                                onClickHandler={this.toggleTradeWindow}
                                            />
                                            <TradeHistoryEntry
                                                active={'2022-10-18' === this.state.selectedTrade}
                                                format={this.computeDateFormat()}
                                                date={'2022-10-18'}
                                                trades={30}
                                                winPercentage={63}
                                                netProfit={41.79}
                                                onClickHandler={this.toggleTradeWindow}
                                            />
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="column is-6">
                        {tradeWindow}
                    </div>
                    <div className="column is-12">
                        <div className="card">
                            <div className="card-content">
                                <div className="chart-container">
                                    <Chart options={this.state.options} series={this.state.series} type="candlestick"
                                           height={"100%"} width={"100%"}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}