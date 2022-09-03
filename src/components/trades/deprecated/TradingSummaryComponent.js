import React, {Component} from "react";
import {displayString} from "../../services/FormattingService";
import TradingRecordComponent from "./TradingRecordComponent";

export default class TradingSummaryComponent extends Component {


    //  RENDER FUNCTION

    render() {
        return (
            <div className="box box-border-blue">
                <h2 className="is-size-5">{displayString(this.state.interval)} Trading Summary</h2>
                <h6 className="is-size-7">August 2022</h6>
                <hr className="card-hr"/>
                <table className="table is-striped is-fullwidth is-narrow">
                    <thead>
                    <tr>
                        <th className="has-text-left is-vcentered">
                            <abbr title="Date">Date</abbr>
                        </th>
                        <th className="has-text-centered is-vcentered">
                            <abbr title="Profit Target">Target</abbr>
                        </th>
                        <th className="has-text-centered is-vcentered">
                            <abbr title="Number of Trades"># of Trades</abbr>
                        </th>
                        <th className="has-text-centered is-vcentered">
                            <abbr title="Win Percentage">Win%</abbr>
                        </th>
                        <th className="has-text-centered is-vcentered">
                            <abbr title="Net Profit">Profit</abbr>
                        </th>
                        <th className="has-text-centered is-vcentered">
                            <abbr title="Net Profit Percentage">%Profit</abbr>
                        </th>
                        <th className="has-text-centered is-vcentered">
                            <abbr title="Surplus/Deficit">Surplus</abbr>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.report.map((item, key) => {
                                return (
                                    <TradingRecordComponent key={key} record={item} listHandler={this.toggleTradeListView} interval={this.state.interval}/>
                                )
                            }
                        )
                    }
                    </tbody>
                    <tfoot>
                    <tr>
                        <th className="has-text-left is-vcentered">
                            Totals
                        </th>
                        <th/>
                        <th className="has-text-centered is-vcentered">
                            {this.state.totals.totalNumberOfTrades}
                        </th>
                        <th className="has-text-centered is-vcentered">
                            {this.state.totals.averageWinPercentage}
                        </th>
                        <th className="has-text-centered is-vcentered">
                            {this.state.totals.netProfit}
                        </th>
                        <th className="has-text-centered is-vcentered">
                            0.0
                        </th>
                        <th className="has-text-centered is-vcentered">
                            0.0
                        </th>
                    </tr>
                    </tfoot>
                </table>
            </div>
        );
    }
}
