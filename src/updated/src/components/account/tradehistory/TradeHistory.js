import React, {Component} from "react";
import TradeHistoryEntry from "./TradeHistoryEntry";
import {RiHistoryFill} from "react-icons/ri";

export default class TradeHistory extends Component {

    //  RENDER FUNCTION

    render() {
        return (
            <div className="trade-history">
                <div className="card">
                    <div className="card-content">
                        <div className="columns is-multiline is-mobile is-vcentered is-gapless">
                            <div className="column is-6">
                                <h5 className="header">Trade Log</h5>
                                <h6 className="sub-header">Last {this.props.count} Sessions</h6>
                            </div>
                            <div className="column is-6 has-text-right">
                                <button className="button is-primary">
                                    <span className="icon">
                                        <RiHistoryFill />
                                    </span>
                                    <span>History</span>
                                </button>
                            </div>
                        </div>
                        <div className="container">
                            <div className="table-container">
                                <table className="table is-fullwidth is-narrow">
                                    <thead>
                                    <tr>
                                        <th className="has-text-left">Date</th>
                                        <th className="has-text-centered"># of Trades</th>
                                        <th className="has-text-centered">Win %</th>
                                        <th className="has-text-centered">P&L</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <TradeHistoryEntry
                                        format={'MMMM Do'}
                                        date={'2022-10-18'}
                                        trades={30}
                                        winPercentage={63}
                                        netProfit={41.79}
                                    />
                                    <TradeHistoryEntry
                                        format={'MMMM Do'}
                                        date={'2022-10-17'}
                                        trades={6}
                                        winPercentage={100}
                                        netProfit={83.67}
                                    />
                                    <TradeHistoryEntry
                                        format={'MMMM Do'}
                                        date={'2022-10-14'}
                                        trades={16}
                                        winPercentage={62}
                                        netProfit={64.13}
                                    />
                                    <TradeHistoryEntry
                                        format={'MMMM Do'}
                                        date={'2022-10-13'}
                                        trades={12}
                                        winPercentage={83}
                                        netProfit={48.80}
                                    />
                                    <TradeHistoryEntry
                                        format={'MMMM Do'}
                                        date={'2022-10-12'}
                                        trades={8}
                                        winPercentage={50}
                                        netProfit={35.49}
                                    />
                                    <TradeHistoryEntry
                                        format={'MMMM Do'}
                                        date={'2022-10-11'}
                                        trades={18}
                                        winPercentage={56}
                                        netProfit={49.80}
                                    />
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}