import React, {Component} from "react";
import moment from "moment";

export default class TradeHistoryEntry extends Component {


    //  RENDER FUNCTION

    render() {
        return (
            <tr className="trade-history-entry">
                <td className="has-text-left">
                    <span className="sub-header">{moment(this.props.date).format('MMMM')}</span>
                    <br/>
                    <span className="value">{moment(this.props.date).format('Do')}</span>
                </td>
                <td className="has-text-centered is-vcentered">{this.props.trades}</td>
                <td className="has-text-centered is-vcentered">{this.props.winPercentage}</td>
                <td className="has-text-centered is-vcentered">{this.props.netProfit}</td>
            </tr>
        );
    }
}