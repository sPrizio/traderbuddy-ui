import React, {Component} from "react";
import {formatNumberForDisplay} from "../../../../service/FormattingService";
import {FaChevronDown, FaChevronUp} from "react-icons/fa";
import TradeLogEntryEquityCurve from "./TradeLogEntryEquityCurve";
import {AiOutlineArrowDown, AiOutlineArrowUp} from "react-icons/ai";
import TradeLogTradeList from "../list/TradeLogTradeList";
import TradeLogEntryCandleChart from "../chart/TradeLogEntryCandleChart";
import {options} from "../../../../util/CandleStickChartConfig";
import moment from "moment";
import {SlMagnifier} from "react-icons/sl";
import {CoreConstants} from "../../../../constants/coreConstants";

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

            //  format: [[Timestamp], [Open, High, Low, Close]]
            chartData: [
                {
                    name: 'Price',
                    type: 'candlestick',
                    data: [
                        {
                            x: new Date(1538798400000),
                            y: [6608.91, 6618.99, 6608.01, 6612]
                        },
                        {
                            x: new Date(1538800200000),
                            y: [6612, 6615.13, 6605.09, 6612]
                        },
                        {
                            x: new Date(1538802000000),
                            y: [6612, 6624.12, 6608.43, 6622.95]
                        },
                        {
                            x: new Date(1538803800000),
                            y: [6623.91, 6623.91, 6615, 6615.67]
                        },
                        {
                            x: new Date(1538805600000),
                            y: [6618.69, 6618.74, 6610, 6610.4]
                        },
                        {
                            x: new Date(1538807400000),
                            y: [6611, 6622.78, 6610.4, 6614.9]
                        },
                        {
                            x: new Date(1538809200000),
                            y: [6614.9, 6626.2, 6613.33, 6623.45]
                        },
                        {
                            x: new Date(1538811000000),
                            y: [6623.48, 6627, 6618.38, 6620.35]
                        },
                        {
                            x: new Date(1538812800000),
                            y: [6619.43, 6620.35, 6610.05, 6615.53]
                        },
                        {
                            x: new Date(1538814600000),
                            y: [6615.53, 6617.93, 6610, 6615.19]
                        },
                        {
                            x: new Date(1538816400000),
                            y: [6615.19, 6621.6, 6608.2, 6620]
                        },
                        {
                            x: new Date(1538818200000),
                            y: [6619.54, 6625.17, 6614.15, 6620]
                        },
                        {
                            x: new Date(1538820000000),
                            y: [6620.33, 6634.15, 6617.24, 6624.61]
                        },
                        {
                            x: new Date(1538821800000),
                            y: [6625.95, 6626, 6611.66, 6617.58]
                        },
                        {
                            x: new Date(1538823600000),
                            y: [6619, 6625.97, 6595.27, 6598.86]
                        },
                        {
                            x: new Date(1538825400000),
                            y: [6598.86, 6598.88, 6570, 6587.16]
                        },
                        {
                            x: new Date(1538827200000),
                            y: [6588.86, 6600, 6580, 6593.4]
                        },
                        {
                            x: new Date(1538829000000),
                            y: [6593.99, 6598.89, 6585, 6587.81]
                        },
                        {
                            x: new Date(1538830800000),
                            y: [6587.81, 6592.73, 6567.14, 6578]
                        },
                        {
                            x: new Date(1538832600000),
                            y: [6578.35, 6581.72, 6567.39, 6579]
                        },
                        {
                            x: new Date(1538834400000),
                            y: [6579.38, 6580.92, 6566.77, 6575.96]
                        },
                        {
                            x: new Date(1538836200000),
                            y: [6575.96, 6589, 6571.77, 6588.92]
                        },
                        {
                            x: new Date(1538838000000),
                            y: [6588.92, 6594, 6577.55, 6589.22]
                        },
                        {
                            x: new Date(1538839800000),
                            y: [6589.3, 6598.89, 6589.1, 6596.08]
                        },
                        {
                            x: new Date(1538841600000),
                            y: [6597.5, 6600, 6588.39, 6596.25]
                        },
                        {
                            x: new Date(1538843400000),
                            y: [6598.03, 6600, 6588.73, 6595.97]
                        },
                        {
                            x: new Date(1538845200000),
                            y: [6595.97, 6602.01, 6588.17, 6602]
                        },
                        {
                            x: new Date(1538847000000),
                            y: [6602, 6607, 6596.51, 6599.95]
                        },
                        {
                            x: new Date(1538848800000),
                            y: [6600.63, 6601.21, 6590.39, 6591.02]
                        },
                        {
                            x: new Date(1538850600000),
                            y: [6591.02, 6603.08, 6591, 6591]
                        },
                        {
                            x: new Date(1538852400000),
                            y: [6591, 6601.32, 6585, 6592]
                        },
                        {
                            x: new Date(1538854200000),
                            y: [6593.13, 6596.01, 6590, 6593.34]
                        },
                        {
                            x: new Date(1538856000000),
                            y: [6593.34, 6604.76, 6582.63, 6593.86]
                        },
                        {
                            x: new Date(1538857800000),
                            y: [6593.86, 6604.28, 6586.57, 6600.01]
                        },
                        {
                            x: new Date(1538859600000),
                            y: [6601.81, 6603.21, 6592.78, 6596.25]
                        },
                        {
                            x: new Date(1538861400000),
                            y: [6596.25, 6604.2, 6590, 6602.99]
                        },
                        {
                            x: new Date(1538863200000),
                            y: [6602.99, 6606, 6584.99, 6587.81]
                        },
                        {
                            x: new Date(1538865000000),
                            y: [6587.81, 6595, 6583.27, 6591.96]
                        },
                        {
                            x: new Date(1538866800000),
                            y: [6591.97, 6596.07, 6585, 6588.39]
                        },
                        {
                            x: new Date(1538868600000),
                            y: [6587.6, 6598.21, 6587.6, 6594.27]
                        },
                        {
                            x: new Date(1538870400000),
                            y: [6596.44, 6601, 6590, 6596.55]
                        },
                        {
                            x: new Date(1538872200000),
                            y: [6598.91, 6605, 6596.61, 6600.02]
                        },
                        {
                            x: new Date(1538874000000),
                            y: [6600.55, 6605, 6589.14, 6593.01]
                        },
                        {
                            x: new Date(1538875800000),
                            y: [6593.15, 6605, 6592, 6603.06]
                        },
                        {
                            x: new Date(1538877600000),
                            y: [6603.07, 6604.5, 6599.09, 6603.89]
                        },
                        {
                            x: new Date(1538879400000),
                            y: [6604.44, 6604.44, 6600, 6603.5]
                        },
                        {
                            x: new Date(1538881200000),
                            y: [6603.5, 6603.99, 6597.5, 6603.86]
                        },
                        {
                            x: new Date(1538883000000),
                            y: [6603.85, 6605, 6600, 6604.07]
                        }
                    ]
                },
                {
                    name: '25 EMA',
                    type: 'line',
                    data: [
                        {
                            x: new Date(1538852400000),
                            y: [6591, 6601.32, 6585, 6592]
                        },
                        {
                            x: new Date(1538854200000),
                            y: [6593.13, 6596.01, 6590, 6593.34]
                        },
                        {
                            x: new Date(1538856000000),
                            y: [6593.34, 6604.76, 6582.63, 6593.86]
                        },
                        {
                            x: new Date(1538857800000),
                            y: [6593.86, 6604.28, 6586.57, 6600.01]
                        },
                        {
                            x: new Date(1538859600000),
                            y: [6601.81, 6603.21, 6592.78, 6596.25]
                        },
                        {
                            x: new Date(1538861400000),
                            y: [6596.25, 6604.2, 6590, 6602.99]
                        },
                        {
                            x: new Date(1538863200000),
                            y: [6602.99, 6606, 6584.99, 6587.81]
                        },
                        {
                            x: new Date(1538865000000),
                            y: [6587.81, 6595, 6583.27, 6591.96]
                        },
                        {
                            x: new Date(1538866800000),
                            y: [6591.97, 6596.07, 6585, 6588.39]
                        },
                        {
                            x: new Date(1538868600000),
                            y: [6587.6, 6598.21, 6587.6, 6594.27]
                        },
                        {
                            x: new Date(1538870400000),
                            y: [6596.44, 6601, 6590, 6596.55]
                        },
                        {
                            x: new Date(1538872200000),
                            y: [6598.91, 6605, 6596.61, 6600.02]
                        },
                        {
                            x: new Date(1538874000000),
                            y: [6600.55, 6605, 6589.14, 6593.01]
                        },
                        {
                            x: new Date(1538875800000),
                            y: [6593.15, 6605, 6592, 6603.06]
                        },
                        {
                            x: new Date(1538877600000),
                            y: [6603.07, 6604.5, 6599.09, 6603.89]
                        },
                        {
                            x: new Date(1538879400000),
                            y: [6604.44, 6604.44, 6600, 6603.5]
                        },
                        {
                            x: new Date(1538881200000),
                            y: [6603.5, 6603.99, 6597.5, 6603.86]
                        },
                        {
                            x: new Date(1538883000000),
                            y: [6603.85, 6605, 6600, 6604.07]
                        }
                    ]
                }
            ],
            options: options,
        }

        this.changePage = this.changePage.bind(this)
        this.disregardTrade = this.disregardTrade.bind(this)
        this.selectTrade = this.selectTrade.bind(this)
        this.toggleTradeView = this.toggleTradeView.bind(this)
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
                            <FaChevronUp /> :
                            <FaChevronDown />
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
                            <span className="icon">
                                <SlMagnifier />
                            </span>
                        </span>
                    </button>
                </span>
        }

        let chart =
            <div className="has-text-centered">
                <p>Select a trade to view on the chart</p>
            </div>
        if (this.state.isTradeSelected && (!this.state.chartData || this.state.chartData.length === 0)) {
            chart =
                <div className="has-text-centered">
                    <p>Chart Data is currently unavailable. Please try again later or a few hours after market close.</p>
                </div>
        } else if (this.state.isTradeSelected && this.state.chartData && this.state.chartData.length !== 0) {
            chart = <TradeLogEntryCandleChart series={this.state.chartData} options={this.state.options} />
        }

        return (
            <div className="trade-log">
                <div className="card">
                    <div className="card-content">
                        <div className="columns is-multiline is-mobile is-gapless is-vcentered">
                            <div className="column is-10">
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
                            <div className="column is-1 has-text-centered">
                                {expandButton}
                                {exploreButton}
                            </div>
                        </div>
                        <hr />
                        <div className="columns is-multiline is-mobile is-vcentered ordered-columns">
                            <div className="column is-3">
                                <TradeLogEntryEquityCurve points={this.props.tradeRecord.statistics.points} index={this.props.index} />
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
                                        </td>
                                        <td className="has-text-right">
                                            <h5 className="value">
                                                {formatNumberForDisplay(this.props.tradeRecord.statistics.netProfit)}
                                            </h5>
                                            <h6 className="row-entry-small">
                                                <span className="icon-text negative">
                                                    <span>{formatNumberForDisplay(Math.abs(this.props.tradeRecord.statistics.grossLossAmount))}</span>
                                                    <span className="icon">
                                                        <AiOutlineArrowDown />
                                                    </span>
                                                </span>
                                                <span className="icon-text positive">
                                                    <span>{formatNumberForDisplay(this.props.tradeRecord.statistics.grossWinAmount)}</span>
                                                    <span className="icon">
                                                        <AiOutlineArrowUp />
                                                    </span>
                                                </span>
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
                            <div className={"column is-12" + ((this.state.isActive && this.props.shouldAllowTradeList) ? '' : ' no-show ')}>
                                <hr />
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