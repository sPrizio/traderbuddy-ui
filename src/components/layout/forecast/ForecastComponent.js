import React, {Component} from "react";
import moment from "moment";
import {formatNumberForDisplay} from "../../../services/FormattingService"

export default class ForecastComponent extends Component {


    //  GENERAL FUNCTIONS

    computeDateHeader() {
        switch (this.props.interval) {
            case 'DAILY':
                return moment(this.props.selectedDate).format('MMMM yyyy')
            case 'WEEKLY':
            case 'MONTHLY':
                return moment(this.props.selectedDate).format('yyyy')
            default:
                return ''
        }
    }

    computeDateDisplay(val1, val2) {
        switch (this.props.interval) {
            case 'DAILY':
                return moment(val1).format('MMM Do')
            case 'WEEKLY':
                return moment(val1).format('MMM D') + '-' + moment(val2).format('D')
            case 'MONTHLY':
                return moment(val1).format('MMMM yyyy')
            case 'YEARLY':
                return moment(val1).format('yyyy')
            default:
                return val1
        }
    }


    //  RENDER FUNCTION

    render() {
        return (
            <div className="box box-border-blue">
                <h2 className="is-size-5">Forecast</h2>
                <h6 className="is-size-7">{this.computeDateHeader()}</h6>
                <hr className="card-hr"/>
                <table className="table is-fullwidth is-striped is-narrow">
                    <thead>
                    <tr>
                        <th className="has-text-left">Period</th>
                        <th className="has-text-centered">Deposits</th>
                        <th className="has-text-centered">Earnings</th>
                        <th className="has-text-centered">Total Earnings</th>
                        <th className="has-text-centered">Withdrawals</th>
                        <th className="has-text-centered">Balance</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.data.map((item, key) => {
                            return (
                                <tr key={key}>
                                    <td className="has-text-left is-size-6">{this.computeDateDisplay(item.startDate, item.endDate)}</td>
                                    <td className="has-text-centered is-size-6">{formatNumberForDisplay(item.deposits)}</td>
                                    <td className="has-text-centered is-size-6">{formatNumberForDisplay(item.earnings)}</td>
                                    <td className="has-text-centered is-size-6">{formatNumberForDisplay(item.netEarnings)}</td>
                                    <td className="has-text-centered is-size-6">{formatNumberForDisplay(item.withdrawals)}</td>
                                    <td className="has-text-centered is-size-6">{formatNumberForDisplay(item.balance)}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}