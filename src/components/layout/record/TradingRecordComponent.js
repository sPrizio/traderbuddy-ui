import React, {Component} from "react";
import moment from "moment/moment";
import {formatNumberForDisplay} from "../../../services/FormattingService";
import {IoReturnUpBackOutline} from "react-icons/io5";

export default class TradingRecordComponent extends Component {


    //  GENERAL FUNCTIONS

    computeDateDisplay(val1) {
        switch (this.props.interval) {
            case 'DAILY':
                return moment(val1).format('MMM Do')
            case 'WEEKLY':
                return moment(val1).format('MMM Do') + ' - ' + moment(val1).add(6, 'day').format('Do')
            case 'MONTHLY':
                return moment(val1).format('MMMM')
            case 'YEARLY':
                return moment(val1).format('yyyy')
            default:
                return val1
        }
    }

    computeTargetHit(val) {
        if (val) {
            return ' target-hit '
        }

        return ''
    }


    //  RENDER FUNCTION

    render() {
        let returnButton;
        if (this.props.interval === 'DAILY') {
            returnButton =
                <p className="has-text-left is-text-blue has-text-weight-medium back-link-hover is-size-6-half hidden">
                            <span className="icon-text back-link-hover">
                                <span className="icon">
                                    <IoReturnUpBackOutline/>
                                </span>
                                <span className="back-link-hover">Monthly Forecast</span>
                            </span>
                </p>
        } else {
            returnButton = null;
        }

        return (
            <div className="box box-border-blue">
                <div className="level">
                    <div className="level-left">
                        <div className="level-item">
                            <div>
                                <h2 className="is-size-5">Performance</h2>
                                <h6 className="is-size-7">{this.props.dateHeader}</h6>
                            </div>
                        </div>
                    </div>

                    <div className="level-right"/>
                </div>
                <hr className="card-hr"/>
                {returnButton}
                <table
                    className={"table is-fullwidth is-striped " + (this.props.interval === 'MONTHLY' ? ' is-hoverable ' : '')}>
                    <thead>
                    <tr>
                        <th className="has-text-left is-size-6-half">Period</th>
                        <th className="has-text-centered is-size-6-half">Target</th>
                        <th className="has-text-centered is-size-6-half">Trades</th>
                        <th className="has-text-centered is-size-6-half">Win%</th>
                        <th className="has-text-centered is-size-6-half">Profit</th>
                        <th className="has-text-centered is-size-6-half">Profit%</th>
                        <th className="has-text-centered is-size-6-half">Surplus</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.data.map((item, key) => {
                            return (
                                <tr key={key} className={((item.active) ? ' is-selected ' : '')}>
                                    <td className="has-text-left is-size-6-half">{this.computeDateDisplay(item.start)}</td>
                                    <td className="has-text-centered is-size-6-half">{formatNumberForDisplay(item.target)}</td>
                                    <td className="has-text-centered is-size-6-half">{formatNumberForDisplay(item.numberOfTrades)}</td>
                                    <td className="has-text-centered is-size-6-half">{formatNumberForDisplay(item.winPercentage)}</td>
                                    <td className="has-text-centered is-size-6-half">{formatNumberForDisplay(item.netProfit)}</td>
                                    <td className={"has-text-centered is-size-6-half " + (this.computeTargetHit(item.targetHit))}>
                                        {
                                            item.active ?
                                                '-'
                                                :
                                                formatNumberForDisplay(item.percentageProfit)
                                        }
                                    </td>
                                    <td className={"has-text-centered is-size-6-half"}>
                                        {
                                            item.active ?
                                                '-'
                                                :
                                                formatNumberForDisplay(item.surplus)
                                        }
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                    <tfoot>
                    <tr>
                        <th className="has-text-left is-size-6-half">Totals</th>
                        <th/>
                        <th className="has-text-centered is-size-6-half">{formatNumberForDisplay(this.props.totals.totalNumberOfTrades)}</th>
                        <th className="has-text-centered is-size-6-half">{formatNumberForDisplay(this.props.totals.averageWinPercentage)}</th>
                        <th className="has-text-centered is-size-6-half">{formatNumberForDisplay(this.props.totals.netProfit)}</th>
                        <th className="has-text-centered is-size-6-half">{formatNumberForDisplay(this.props.totals.averageProfitPercentage)}</th>
                        <th className="has-text-centered is-size-6-half">{formatNumberForDisplay(this.props.totals.surplus)}</th>
                    </tr>
                    </tfoot>
                </table>
            </div>
        );
    }
}