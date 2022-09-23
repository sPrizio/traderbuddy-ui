import React, {Component} from "react";
import Moment from "react-moment";
import moment from "moment";
import {displayString, formatNumberForDisplay} from "../../../services/FormattingService"
import {AiFillDelete} from "react-icons/ai";
import {getDomain} from "../../../services/ConfigurationService"

export default class TradesListComponent extends Component {

    static tradesUrl = getDomain() + '/trades/for-interval'

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            trades: [],
            showRelevantTrades: true
        }

        this.toggleShowRelevantTrades = this.toggleShowRelevantTrades.bind(this)
    }


    //  HANDLER FUNCTIONS

    toggleShowRelevantTrades() {
        this.setState({
            showRelevantTrades: !this.state.showRelevantTrades
        }, () => this.getTrades())
    }


    //  GENERAL FUNCTIONS

    formatDate(value) {
        return <Moment format={this.props.dateFormat}>{value}</Moment>
    }

    formatListDate(value) {
        switch (this.props.interval) {
            case 'daily':
                return <Moment format={"HH:mm"}>{value}</Moment>
            default:
                return <Moment format={"MMM Do HH:mm"}>{value}</Moment>
        }
    }

    computeEndDate() {
        switch (this.props.interval) {
            case 'weekly':
                return new moment(this.props.date).add(7, "days").format("yyyy-MM-DDTHH:mm:ss")
            case 'monthly':
                return new moment(this.props.date).add(1, "months").format("yyyy-MM-DDTHH:mm:ss")
            case 'yearly':
                return new moment(this.props.date).add(1, "years").format("yyyy-MM-DDTHH:mm:ss")
            default:
                return new moment(this.props.date).add(1, "days").format("yyyy-MM-DDTHH:mm:ss")
        }
    }

    async getTrades() {
        try {
            this.setState({isLoading: true})
            const response = await fetch(TradesListComponent.tradesUrl + '?start=' + this.props.date + '&end=' + this.computeEndDate() + '&includeNonRelevant=' + !this.state.showRelevantTrades);
            const data = await response.json();

            this.setState({
                isLoading: false,
                trades: data.data
            })
        } catch (e) {
            this.setState({isLoading: false})
            console.log(e)
        }
    }


    //  RENDER FUNCTION

    render() {
        let tradesDisplay
        if (this.state.trades && this.state.trades.length > 0) {
            tradesDisplay =
                this.state.trades.map((item, key) => {
                    return (
                        <tr key={key} className={(!item.relevant ? ' opacity-35 ' : '')}>
                            <td className="has-text-centered is-vcentered">
                                {this.formatListDate(item.tradeOpenTime)}
                            </td>
                            <td className="has-text-centered is-vcentered">{displayString(item.tradeType)}</td>
                            <td className="has-text-centered is-vcentered">{item.product}</td>
                            <td className="has-text-centered is-vcentered">{item.lotSize}</td>
                            <td className="has-text-right is-vcentered">{formatNumberForDisplay(item.netProfit)}</td>
                            <td className="has-text-centered is-vcentered">
                                <button className="button" onClick={() => {
                                    this.props.disregardHandler(item.tradeId)
                                    this.forceUpdate(() => this.getTrades())
                                }}>
                                    <span className="icon"><AiFillDelete/></span>
                                </button>
                            </td>
                        </tr>
                    )
                })
        } else {
            tradesDisplay =
                <tr className={"has-text-centered"}>
                    <td colSpan={6}>No trades for this period.</td>
                </tr>
        }

        return (
            <div className={"modal " + (this.props.active ? ' is-active' : '')}>
                <div className="modal-background" />
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">{this.formatDate(this.props.date)}</p>
                        <button className="delete" aria-label="close" onClick={() => this.props.closeHandler() }></button>
                    </header>
                    <section className="modal-card-body">
                        <div className="columns is-multiline is-mobile is-gapless">
                            <div className="column is-12 has-text-right">
                                <label className="checkbox">
                                    <input type="checkbox" checked={this.state.showRelevantTrades}
                                           onChange={() => this.toggleShowRelevantTrades()}/>&nbsp;Show relevant trades
                                </label>
                            </div>
                        </div>
                        <hr className="card-hr"/>
                        <table className="table is-fullwidth is-narrow">
                            <thead>
                            <tr>
                                <th className="has-text-centered is-vcentered">
                                    Time
                                </th>
                                <th className="has-text-centered is-vcentered">
                                    Type
                                </th>
                                <th className="has-text-centered is-vcentered">
                                    Product
                                </th>
                                <th className="has-text-centered is-vcentered">
                                    Lot Size
                                </th>
                                <th className="has-text-right is-vcentered">
                                    Profit
                                </th>
                                <th/>
                            </tr>
                            </thead>
                            <tbody>
                            {tradesDisplay}
                            </tbody>
                        </table>
                    </section>
                </div>
            </div>
        );
    }


    //  LIFECYCLE FUNCTIONS

    async componentDidMount() {
        await this.getTrades()
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.date !== prevProps.date) {
            await this.getTrades()
        }
    }
}
