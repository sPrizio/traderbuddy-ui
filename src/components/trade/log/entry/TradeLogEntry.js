import React, {Component} from "react";
import {formatNumberForDisplay} from "../../../../service/FormattingService";
import {FaChevronDown, FaChevronUp} from "react-icons/fa";
import TradeLogEntryEquityCurve from "./TradeLogEntryEquityCurve";
import TradeLogTradeList from "../list/TradeLogTradeList";
import TradeRecapCandleChart from "../../recap/TradeRecapCandleChart";
import moment from "moment";
import {SlMagnifier} from "react-icons/sl";
import {CoreConstants} from "../../../../constants/coreConstants";
import TradeLogEntryEquityCurveModal from "./TradeLogEntryEquityCurveModal";
import {MdInsertChartOutlined} from "react-icons/md";

export default class TradeLogEntry extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            isActive: false,
            isTradeSelected: false,
            trades: [],
            currentPage: 0,
            pageSize: 10,
            selectedTrade: 'none',
            modalActive: false,
        }

        this.changePage = this.changePage.bind(this)
        this.disregardTrade = this.disregardTrade.bind(this)
        this.selectTrade = this.selectTrade.bind(this)
        this.toggleTradeView = this.toggleTradeView.bind(this)
        this.toggleModal = this.toggleModal.bind(this)
    }


    //  HANDLERS

    changePage(val) {
        this.setState({currentPage: val, selectedTrade: 'none'}, () => this.getTrades())
    }

    selectTrade(val) {
        this.setState({
            selectedTrade: val,
            isTradeSelected: true
        })
    }

    toggleTradeView() {
        this.setState({isActive: !this.state.isActive}, () => this.getTrades())
    }

    toggleModal() {
        const val = this.state.modalActive
        this.setState({modalActive: !val})
    }


    //  GENERAL FUNCTIONS

    computeHeader() {
        const interval = this.props.tradeRecord.aggregateInterval
        if (interval === 'DAILY') {
            return moment(this.props.tradeRecord.startDate).format(CoreConstants.DateTime.ISOMonthDayFormat)
        } else if (interval === 'WEEKLY') {
            return moment(this.props.tradeRecord.startDate).format(CoreConstants.DateTime.ISOMonthDayFormat) + ' - ' + moment(this.props.tradeRecord.endDate).format(CoreConstants.DateTime.ISODayFormat)
        } else if (interval === 'MONTHLY') {
            return moment(this.props.tradeRecord.startDate).format(CoreConstants.DateTime.ISOMonthFormat)
        }

        return moment(this.props.tradeRecord.startDate).format(CoreConstants.DateTime.ISOYearFormat)
    }

    computeSubHeader() {
        if (this.props.tradeRecord.aggregateInterval === 'DAILY') {
            return (
                <h6 className="sub-header">
                    {moment(this.props.tradeRecord.startDate).format(CoreConstants.DateTime.ISOWeekdayFormat)}
                </h6>
            )
        } else if (this.props.tradeRecord.aggregateInterval === 'MONTHLY') {
            return (
                <h6 className="sub-header">
                    {moment(this.props.tradeRecord.startDate).format(CoreConstants.DateTime.ISOYearFormat)}
                </h6>
            )
        }

        return null
    }

    computeWinningText() {
        const wins = this.props.tradeRecord.statistics.numberOfWinningTrades
        const perc = this.props.tradeRecord.statistics.winPercentage

        if (wins === 1) {
            return (
                <h6 className="row-entry-small">1 win (100%)</h6>
            )
        }

        return (
            <h6 className="row-entry-small">{wins} wins ({perc}%)</h6>
        )
    }

    async getTrades() {

        try {
            this.setState({isLoading: true})
            const response = await fetch(
                CoreConstants.ApiUrls.Trade.ListPaged
                    .replace('{start}', moment(this.props.tradeRecord.startDate).format(CoreConstants.DateTime.ISODateTimeFormat))
                    .replace('{end}', moment(this.props.tradeRecord.endDate).format(CoreConstants.DateTime.ISODateTimeFormat))
                    .replace('{includeNonRelevant}', 'false')
                    .replace('{page}', this.state.currentPage)
                    .replace('{pageSize}', this.state.pageSize)
            )

            const data = await response.json()
            this.setState({
                trades: data.data
            })
        } catch (e) {
            console.log(e)
        }

        this.setState({
            isLoading: false,
        })
    }

    async disregardTrade(val) {
        try {
            const requestOptions = {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({tradeId: val})
            }

            this.setState({isLoading: true})
            const response = await fetch(
                CoreConstants.ApiUrls.Trade.Disregard,
                requestOptions
            )

            const data = await response.json();
            if (data.data && data.success) {
                await this.getTrades()
                this.forceUpdate(() => window.location.reload(true))
            }
        } catch (e) {
            console.log(e)
        }

        this.setState({
            isLoading: false,
        })
    }


    //  RENDER FUNCTION

    render() {
        let expandButton = null
        if (this.props.tradeRecord.aggregateInterval === 'DAILY') {
            expandButton =
                <span className="expand" onClick={this.toggleTradeView}>
                    {
                        this.state.isActive ?
                            <FaChevronUp/> :
                            <FaChevronDown/>
                    }
                </span>
        }

        let exploreButton = null
        if (this.props.tradeRecord.aggregateInterval !== 'DAILY') {
            exploreButton =
                <span className="expand" onClick={() => {
                    const record = this.props.tradeRecord
                    const st = record.startDate
                    const en = moment(record.endDate).add(1, 'days').format(CoreConstants.DateTime.ISODateFormat)
                    this.props.selectEntryHandler(record.aggregateInterval, st, en)
                }}>
                    <button className="button is-primary">
                        <span className="icon-text">
                            <span>View</span>
                            <span className="icon">
                                <SlMagnifier/>
                            </span>
                        </span>
                    </button>
                </span>
        }

        let chart =
            <div className="has-text-centered">
                <p>Select a trade to view on the chart</p>
            </div>
        if (this.state.isTradeSelected) {
            chart = <TradeRecapCandleChart tradeId={this.state.selectedTrade} hideYAxis={true} hideXAxis={true}/>
        }

        return (
            <div className="trade-log">
                <div className="card">
                    <div className="card-content">
                        <div className="columns is-multiline is-mobile is-gapless is-vcentered">
                            <div className="column is-9">
                                <h5 className="header">{this.computeHeader()}</h5>
                                {this.computeSubHeader()}
                            </div>
                            <div className="column is-1 has-text-right">
                                <p className={'percentage' + (this.props.tradeRecord.statistics.percentageProfit >= 0 ? ' positive ' : ' negative ')}>
                                    {
                                        this.props.tradeRecord.statistics.percentageProfit !== 0 ?
                                            formatNumberForDisplay(this.props.tradeRecord.statistics.percentageProfit) + '%'
                                            :
                                            null
                                    }
                                </p>
                            </div>
                            <div className="column is-1 has-text-right">
                                {
                                    this.props.shouldAllowTradeList ?
                                        <button className="button is-primary" onClick={this.toggleModal}>
                                            <span className="icon-text">
                                                <span>Chart</span>
                                                <span className="icon trade-log-header">
                                                    <MdInsertChartOutlined/>
                                                </span>
                                            </span>
                                        </button>
                                        : null
                                }
                            </div>
                            <div className="column is-1 has-text-centered">
                                {expandButton}
                                {exploreButton}
                            </div>
                        </div>
                        <hr/>
                        <div className="columns is-multiline is-mobile is-vcentered ordered-columns">
                            <div className="column is-3">
                                <TradeLogEntryEquityCurve
                                    points={this.props.tradeRecord.statistics.points}
                                    index={this.props.index}
                                    height={125}
                                    showXAxis={false}
                                    showYAxis={false}
                                    showTooltip={false}
                                />
                            </div>
                            <div className="column is-9">
                                <table className="table is-fullwidth">
                                    <tbody>
                                    <tr>
                                        <td className="has-text-left">
                                            <h5 className="header">
                                                Trades
                                            </h5>
                                        </td>
                                        <td className="has-text-right">
                                            <h5 className="value">
                                                {this.props.tradeRecord.statistics.numberOfTrades}
                                            </h5>
                                            {this.computeWinningText()}
                                        </td>
                                        <td className="has-text-left">
                                            <h5 className="header">
                                                Average Win
                                            </h5>
                                        </td>
                                        <td className="has-text-right">
                                            <h5 className="value">{formatNumberForDisplay(this.props.tradeRecord.statistics.averageWinAmount)}</h5>
                                            <h6 className="row-entry-small">{formatNumberForDisplay(this.props.tradeRecord.statistics.averageWinSize)}&nbsp;pts</h6>
                                        </td>
                                        <td className="has-text-left">
                                            <h5 className="header">
                                                Largest Win
                                            </h5>
                                        </td>
                                        <td className="has-text-right">
                                            <h5 className="value">{formatNumberForDisplay(this.props.tradeRecord.statistics.largestWinAmount)}</h5>
                                            <h6 className="row-entry-small">{formatNumberForDisplay(this.props.tradeRecord.statistics.largestWinSize)}&nbsp;pts</h6>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="has-text-left">
                                            <h5 className="header">
                                                Net P&L
                                            </h5>
                                            <h6 className="row-entry-small">
                                                Profitability: {formatNumberForDisplay(1.86)}
                                            </h6>
                                        </td>
                                        <td className="has-text-right">
                                            <h5 className="value">
                                                {formatNumberForDisplay(this.props.tradeRecord.statistics.netProfit)}
                                            </h5>
                                            <h6 className="row-entry-small">
                                                {formatNumberForDisplay(this.props.tradeRecord.statistics.netPips)}&nbsp;pips
                                            </h6>
                                        </td>
                                        <td className="has-text-left">
                                            <h5 className="header">
                                                Average Loss
                                            </h5>
                                        </td>
                                        <td className="has-text-right">
                                            <h5 className="value">{formatNumberForDisplay(this.props.tradeRecord.statistics.averageLossAmount)}</h5>
                                            <h6 className="row-entry-small">{formatNumberForDisplay(this.props.tradeRecord.statistics.averageLossSize)}&nbsp;pts</h6>
                                        </td>
                                        <td className="has-text-left">
                                            <h5 className="header">
                                                Largest Loss
                                            </h5>
                                        </td>
                                        <td className="has-text-right">
                                            <h5 className="value">{formatNumberForDisplay(this.props.tradeRecord.statistics.largestLossAmount)}</h5>
                                            <h6 className="row-entry-small">{formatNumberForDisplay(this.props.tradeRecord.statistics.largestLossSize)}&nbsp;pts</h6>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div
                                className={"column is-12" + ((this.state.isActive && this.props.shouldAllowTradeList) ? '' : ' no-show ')}>
                                <hr/>
                                <div className="columns is-multiline is-mobile is-vcentered">
                                    <div className="column is-6">
                                        <TradeLogTradeList
                                            tradeData={this.state.trades}
                                            pageHandler={this.changePage}
                                            selectedTrade={this.state.selectedTrade}
                                            selectTradeHandler={this.selectTrade}
                                            disregardHandler={this.disregardTrade}
                                        />
                                    </div>
                                    <div className="column is-6">
                                        {chart}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <TradeLogEntryEquityCurveModal modalActive={this.state.modalActive} toggleModal={this.toggleModal}>
                    <TradeLogEntryEquityCurve
                        points={this.props.tradeRecord.statistics.points}
                        index={this.props.index}
                        height={500}
                        showXAxis={true}
                        showYAxis={true}
                        showTooltip={true}
                    />
                </TradeLogEntryEquityCurveModal>
            </div>
        );
    }


    //  LIFECYCLE FUNCTIONS

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.shouldAllowTradeList !== this.props.shouldAllowTradeList) {
            this.setState({
                isActive: false,
                isTradeSelected: false,
                trades: [],
                currentPage: 0,
                pageSize: 10,
                selectedTrade: 'none'
            })
        }
    }
}