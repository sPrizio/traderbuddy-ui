import React, {Component} from "react";
import Moment from "react-moment";

export default class TradingRecordComponent extends Component {


    //  GENERAL FUNCTIONS

    formatDate(value) {
        switch (this.props.interval) {
            case 'weekly':
                return<span><Moment format='MMM D'>{value}</Moment>-<Moment format='D' add={{days: 6}}>{value}</Moment></span>
            case 'monthly':
                return <span><Moment format="MMMM yyyy">{value}</Moment></span>
            case 'yearly':
                return <span><Moment format="yyyy">{value}</Moment></span>
            default:
                return <span><Moment format="MMM Do">{value}</Moment></span>
        }
    }


    //  RENDER FUNCTION

    render() {
        let displayText;
        if (this.props.record.empty) {
            displayText = <span>No trades</span>
        } else {
            displayText = <span>{this.props.record.target}</span>
        }

        return (
            <tr className={(this.props.record.empty ? ' opacity-35' : ' hoverable ')} onClick={this.props.record.empty ? undefined : () => this.props.listHandler(this.props.record.date)}>
                <td className="has-text-left is-vcentered">
                    {this.formatDate(this.props.record.date)}
                </td>
                <td className="has-text-centered is-vcentered " colSpan={this.props.record.empty ? 6 : 0}>
                    {displayText}
                </td>
                <td className={"has-text-centered is-vcentered " + (this.props.record.empty ? 'hide' : '')}>
                    <span>{this.props.record.numberOfTrades}</span>
                </td>
                <td className={"has-text-centered is-vcentered " + (this.props.record.empty ? 'hide' : '')}>
                    <span>{this.props.record.winPercentage}</span>
                </td>
                <td className={"has-text-centered is-vcentered " + (this.props.record.empty ? 'hide' : '')}>
                    <span>{this.props.record.netProfit}</span>
                </td>
                <td className={"has-text-centered is-vcentered " + (this.props.record.empty ? 'hide' : '')}>
                    <span>{this.props.record.profitPercentage}</span>
                </td>
                <td className={"has-text-centered is-vcentered " + (this.props.record.empty ? 'hide' : '')}>
                    <span>{this.props.record.surplus}</span>
                </td>
            </tr>
        );
    }

}
