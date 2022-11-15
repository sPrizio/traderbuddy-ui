import React, {Component} from "react";
import {displayString, formatNumberForDisplay} from "../../../../service/FormattingService";
import {AiFillDelete} from "react-icons/ai";
import moment from "moment";

export default class TradeLogTradeListEntry extends Component {

    constructor(props) {
        super(props);

        this.state = {
            active: false
        }
    }


    //  GENERAL FUNCTIONS

    sanitizeText(val) {
        return val.replace('- Cash', '').trim()
    }


    //  RENDER FUNCTION

    render() {
        return (
            <tr className={"hide-lines" + (this.state.active ? ' selected ' : '')} onClick={() => this.props.selectTradeHandler(this.props.tradeId)}>
                <td className="has-text-centered is-vcentered">
                    {moment(this.props.openTime).format('HH:mm')}
                </td>
                <td className="has-text-centered is-vcentered">
                    {moment(this.props.closeTime).format('HH:mm')}
                </td>
                <td className="has-text-centered is-vcentered">
                    {displayString(this.props.tradeType)}
                </td>
                <td className="has-text-centered is-vcentered">
                    {this.sanitizeText(this.props.symbol)}
                </td>
                <td className="has-text-centered is-vcentered">
                    {formatNumberForDisplay(this.props.size)}&nbsp;pts
                </td>
                <td className="has-text-centered is-vcentered">
                    {formatNumberForDisplay(this.props.netProfit)}
                </td>
            </tr>
        );
    }


    componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.selectedTrade !== this.props.selectedTrade && this.props.tradeId === this.props.selectedTrade) {
            this.setState({active: true})
        } else if (prevProps.selectedTrade !== this.props.selectedTrade && this.props.tradeId !== this.props.selectedTrade) {
            this.setState({active: false})
        }
    }
}