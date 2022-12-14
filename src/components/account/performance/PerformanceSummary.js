import React, {Component} from "react";
import PerformanceSummaryLoader from "../../loader/account/performance/PerformanceSummaryLoader";
import {CoreConstants} from "../../../constants/coreConstants";
import {computeDate} from "../../../service/DateTimeService";
import {formatNumberForDisplay} from "../../../service/FormattingService";

export default class PerformanceSummary extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            summary: {
                statistics: {
                    numberOfTrades: 0,
                    tradingRate: 0,
                    winPercentage: 0,
                    netProfit: 0
                }
            }
        }
    }


    //  GENERAL FUNCTIONS

    async getSummary() {
        try {
            this.setState({isLoading: true})
            const response = await fetch(
                CoreConstants.ApiUrls.TradeRecord.RecentHistory
                    .replace('{count}', '1')
                    .replace('{aggregateInterval}', 'MONTHLY')
                    .replace('{sortOrder}', 'desc')
            )

            const data = await response.json()
            if (data.data && data.data.length > 0) {
                this.setState({
                    summary: data.data[0],
                })
            }
        } catch (e) {
            console.log(e)
        }

        this.setState({
            isLoading: false,
        })
    }


    //  RENDER FUNCTION

    render() {
        let loader = null
        if (this.state.isLoading) {
            loader = <PerformanceSummaryLoader isLoading={this.state.isLoading} />
        }

        return (
            <div className="performance-summary">
                <div className="card">
                    <div className="card-content">
                        {loader}
                        <div className={"" + (this.state.isLoading ? ' no-show ' : '')}>
                            <h5 className="header">Summary</h5>
                            <h6 className="sub-header">{computeDate(this.state.summary.startDate, this.state.summary.endDate, this.state.summary.aggregateInterval)}</h6>
                            <div className="container">
                                <nav className="level is-mobile">
                                    <div className="level-item has-text-centered">
                                        <div>
                                            <p className="sub-header">Trades</p>
                                            <p className="value">{this.state.summary.statistics.numberOfTrades}</p>
                                        </div>
                                    </div>
                                    <div className="level-item has-text-centered">
                                        <div>
                                            <p className="sub-header">Trading Rate</p>
                                            <p className="value">{this.state.summary.statistics.tradingRate}</p>
                                        </div>
                                    </div>
                                    <div className="level-item has-text-centered">
                                        <div>
                                            <p className="sub-header">Win %</p>
                                            <p className="value">{this.state.summary.statistics.winPercentage}</p>
                                        </div>
                                    </div>
                                    <div className="level-item has-text-centered">
                                        <div>
                                            <p className="sub-header">P & L</p>
                                            <p className="value">{formatNumberForDisplay(this.state.summary.statistics.netProfit)}</p>
                                        </div>
                                    </div>
                                    <div className="level-item has-text-centered">
                                        <div>
                                            <p className="sub-header">Points</p>
                                            <p className="value">{formatNumberForDisplay(this.state.summary.statistics.netPips)}</p>
                                        </div>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


    //  LIFECYCLE FUNCTIONS

    async componentDidMount() {
        await this.getSummary()
    }
}
