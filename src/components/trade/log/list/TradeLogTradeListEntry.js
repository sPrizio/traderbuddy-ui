import React, {Component} from "react";
import {displayString, formatNumberForDisplay, sanitizeText} from "../../../../service/FormattingService";
import moment from "moment";
import {CoreConstants} from "../../../../constants/coreConstants";

export default class TradeLogTradeListEntry extends Component {

    constructor(props) {
        super(props);

        this.state = {
            active: false
        }
    }


    //  RENDER FUNCTION

    render() {
        return (
            <tr className={"hide-lines" + (this.state.active ? ' selected ' : '')} onClick={() => this.props.selectTradeHandler(this.props.tradeId)}>
                <td className="has-text-left is-vcentered">
                    {moment(this.props.closeTime).format(CoreConstants.DateTime.ISOShortTimeFormat)}
                </td>
                <td className="has-text-centered is-vcentered">
                    {displayString(this.props.tradeType)}
                </td>
                <td className="has-text-centered is-vcentered">
                    {sanitizeText(this.props.symbol)}
                </td>
                <td className="has-text-centered is-vcentered">
                    {formatNumberForDisplay(this.props.size)}&nbsp;pts
                </td>
                <td className="has-text-centered is-vcentered">
                    {formatNumberForDisplay(this.props.netProfit)}
                </td>
                <td className="has-text-centered is-vcentered">
                    {formatNumberForDisplay(this.props.pips)}
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