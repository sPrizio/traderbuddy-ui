import React, {Component} from "react";

export default class TradeTotalsComponent extends Component {


    //  RENDER FUNCTION

    render() {
        return (
            <div className="level">
                <div className="level-item has-text-centered">
                    <div>
                        <p className="heading">Total Trades</p>
                        <p className="subtitle">{this.props.totals.totalNumberOfTrades}</p>
                    </div>
                </div>
                <div className="level-item has-text-centered">
                    <div>
                        <p className="heading">Average Win %</p>
                        <p className="subtitle">{this.props.totals.averageWinPercentage}%</p>
                    </div>
                </div>
                <div className="level-item has-text-centered">
                    <div>
                        <p className="heading">Net Profit</p>
                        <p className="subtitle">{this.props.totals.netProfit}</p>
                    </div>
                </div>
            </div>
        )
    }
}
