import React, {Component} from "react";
import moment from "moment";
import {formatNumberForDisplay} from "../../../service/FormattingService";
import {CoreConstants} from "../../../constants/coreConstants";

export default class TradeHistoryEntry extends Component {


    //  RENDER FUNCTION

    render() {
        let dateDisplay = <span className="value">{moment(this.props.date).format(this.props.format)}</span>
        if (this.props.format === 'MMMM Do') {
            const day = moment(this.props.date).format(CoreConstants.DateTime.ISODayFormat).match('(\\d+)([a-zA-z]+)')
            dateDisplay =
                <div>
                    <span className="sub-header">{moment(this.props.date).format(CoreConstants.DateTime.ISOMonthFormat)}</span>
                    <br/>
                    <span className="value">
                        {day[1]}<sup>{day[2]}</sup>
                    </span>
                </div>
        }

        return (
            <tr className={"trade-history-entry" + (this.props.active ? ' is-active ' : '')} onClick={() => {
                if (this.props.onClickHandler) {
                    this.props.onClickHandler(this.props.date)
                }
            }}>
                <td className="has-text-left">
                    {dateDisplay}
                </td>
                <td className="has-text-centered is-vcentered">{this.props.trades}</td>
                <td className="has-text-centered is-vcentered">{this.props.winPercentage}</td>
                {/*<td className={"has-text-centered is-vcentered " + (this.props.netProfit >= 0 ? ' positive-cell ' : ' negative-cell ')}>*/}
                <td className="has-text-centered is-vcentered">
                    <div>
                        {formatNumberForDisplay(this.props.netProfit)}
                    </div>
                </td>
                <td className="has-text-centered is-vcentered">
                    {formatNumberForDisplay(this.props.netPips)}
                </td>
            </tr>
        );
    }
}