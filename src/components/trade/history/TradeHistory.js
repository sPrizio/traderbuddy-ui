import React, {Component} from "react";
import TradeHistoryEntry from "./TradeHistoryEntry";
import TradeHistoryLoader from "../../loader/account/tradehistory/TradeHistoryLoader";
import {CoreConstants} from "../../../constants/coreConstants";

export default class TradeHistory extends Component {


    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            trades: []
        }
    }


    //  GENERAL FUNCTIONS

    async getTradeLog() {
        try {
            this.setState({isLoading: true})
            const response = await fetch(
                CoreConstants.ApiUrls.TradeRecord.RecentHistory
                    .replace('{count}', this.props.count)
                    .replace('{aggregateInterval}', 'DAILY')
                    .replace('{sortOrder}', 'desc')
            )

            const data = await response.json()
            this.setState({
                trades: data.data
            })
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
            loader = <TradeHistoryLoader count={this.props.count} isLoading={this.state.isLoading} />
        }

        return (
            <div className="trade-history">
                <div className="card">
                    <div className="card-content">
                        {loader}
                        <div className={"" + (this.state.isLoading ? ' no-show ' : '')}>
                            <div className="columns is-multiline is-mobile is-vcentered is-gapless">
                                <div className="column is-6">
                                    <h5 className="header">Trade Log</h5>
                                    <h6 className="sub-header">Last {this.props.count} Sessions</h6>
                                </div>
                            </div>
                            <div className="container">
                                <div className="table-container">
                                    <table className="table is-fullwidth is-narrow">
                                        <thead>
                                        <tr>
                                            <th className="has-text-left">Date</th>
                                            <th className="has-text-centered">Trades</th>
                                            <th className="has-text-centered">Win %</th>
                                            <th className="has-text-centered">P&L</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            this.state.trades.map((item, key) => {
                                                return (
                                                    <TradeHistoryEntry
                                                        format={'MMMM Do'}
                                                        date={item.startDate}
                                                        trades={item.statistics.numberOfTrades}
                                                        winPercentage={item.statistics.winPercentage}
                                                        netProfit={item.statistics.netProfit}
                                                        key={key}
                                                    />
                                                )
                                            })
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


    //  LIFECYCLE FUNCTIONS

    async componentDidMount() {
        await this.getTradeLog()
    }
}