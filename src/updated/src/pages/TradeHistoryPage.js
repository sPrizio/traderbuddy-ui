import React, {Component} from "react";
import TradeHistoryEntry from "../components/account/tradehistory/TradeHistoryEntry";
import TradeList from "../components/account/tradehistory/TradeList";
import {AiOutlineArrowLeft} from "react-icons/ai";
import TradingViewWidget from 'react-tradingview-widget';

export default class TradeHistoryPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedInterval: 'DAILY',
            tradeWindowActive: false,
            selectedTrade: ''
        }

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
                                <p>Hello World</p>
                                <div className="chart-container">
                                    <TradingViewWidget
                                        symbol="NASDAQ:NDAQ"
                                        theme={'Light'}
                                        locale={"en"}
                                        autosize={true}
                                        allow_symbol_change={false}
                                        interval={5}
                                        timezone={'America/Toronto'}
                                        withdateranges={true}
                                        range={'1d'}
                                        hide_top_toolbar={true}
                                        show_popup_button={false}
                                        hide_side_toolbar={true}
                                        hide_legend={false}
                                        hideideas={true}
                                        enable_publishing={false}
                                        studies={[
                                            {
                                                id: "MAExp@tv-basicstudies",
                                                inputs: {
                                                    length: 25
                                                },
                                                style: {

                                                }
                                            }
                                        ]}
                                        studies_overrides={[

                                        ]}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}