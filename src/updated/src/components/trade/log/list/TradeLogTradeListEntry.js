import React, {Component} from "react";
import {formatNumberForDisplay} from "../../../../service/FormattingService";
import {AiFillDelete} from "react-icons/ai";

export default class TradeLogTradeListEntry extends Component {


    //  RENDER FUNCTION

    render() {
        return (
            <tr className={"hide-lines" + (this.props.active ? ' selected ' : '')}>
                <td className="has-text-centered is-vcentered">
                    {this.props.openTime}
                </td>
                <td className="has-text-centered is-vcentered">
                    {this.props.closeTime}
                </td>
                <td className="has-text-centered is-vcentered">
                    {this.props.tradeType}
                </td>
                <td className="has-text-centered is-vcentered">
                    {this.props.symbol}
                </td>
                <td className="has-text-centered is-vcentered">
                    {formatNumberForDisplay(this.props.size)}&nbsp;pts
                </td>
                <td className="has-text-centered is-vcentered">
                    {formatNumberForDisplay(this.props.netProfit)}
                </td>
                {/*<td className="has-text-centered is-vcentered">
                    <button className="button">
                        <AiFillDelete/>
                    </button>
                </td>*/}
            </tr>
        );
    }
}