import React, {Component} from "react";
import {AiOutlineArrowLeft} from "react-icons/ai";
import TradeLogEntry from "../components/trade/log/entry/TradeLogEntry";
import {CoreConstants} from "../constants/coreConstants";
import moment from "moment";
import {displayString} from "../service/FormattingService";
import {Helmet} from "react-helmet";

export default class TradeHistoryPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            start: moment().startOf('month').format(CoreConstants.DateTime.ISODateFormat),
            end: moment().add(1, 'months').startOf('month').add(1, 'days').format(CoreConstants.DateTime.ISODateFormat),
            interval: 'DAILY',
            trades: [],
            activeYears: [],
            activeMonths: [],
            currentMonth: moment().format(CoreConstants.DateTime.ISOMonthFormat).toUpperCase(),
            currentYear: moment().format(CoreConstants.DateTime.ISOYearFormat)
        };

        this.handleButtonClick = this.handleButtonClick.bind(this)
        this.handleEntrySelect = this.handleEntrySelect.bind(this)
        this.handleMonthChange = this.handleMonthChange.bind(this)
    }


    //  HANDLER FUNCTIONS

    handleButtonClick(value) {
        let val, st, en;
        if (value === 'DAILY') {
            val = 'MONTHLY'
            st = moment(this.state.currentYear + '-' + this.state.currentMonth + '-01', CoreConstants.DateTime.ISODateLongMonthFormat).startOf('year').format(CoreConstants.DateTime.ISODateFormat)
            en = moment(this.state.currentYear + '-' + this.state.currentMonth + '-01', CoreConstants.DateTime.ISODateLongMonthFormat).startOf('year').add(1, 'years').add(1, 'days').format(CoreConstants.DateTime.ISODateFormat)
        } else if (value === 'MONTHLY') {
            val = 'YEARLY'
            st = moment(this.state.currentYear + '-' + this.state.currentMonth + '-01', CoreConstants.DateTime.ISODateLongMonthFormat).startOf('year').subtract(100, 'years').format(CoreConstants.DateTime.ISODateFormat)
            en = moment(this.state.currentYear + '-' + this.state.currentMonth + '-01', CoreConstants.DateTime.ISODateLongMonthFormat).startOf('year').add(2, 'years').add(1, 'days').format(CoreConstants.DateTime.ISODateFormat)
        } else {
            val = 'DAILY'
            st = moment(this.state.currentYear + '-' + this.state.currentMonth + '-01', CoreConstants.DateTime.ISODateLongMonthFormat).startOf('month').format(CoreConstants.DateTime.ISODateFormat)
            en = moment(this.state.currentYear + '-' + this.state.currentMonth + '-01', CoreConstants.DateTime.ISODateLongMonthFormat).startOf('month').add(1, 'month').format(CoreConstants.DateTime.ISODateFormat)
        }

        this.setState({
            interval: val,
            start: st,
            end: en,
            currentYear: st,
            currentMonth: st
        }, () => this.getTradeLog())
    }

    handleEntrySelect(value, start, end) {
        let val;
        if (value === 'MONTHLY') {
            val = 'DAILY'
        } else {
            val = 'MONTHLY'
        }

        this.setState({
            interval: val,
            start: start,
            end: end,
            currentYear: moment(start).format(CoreConstants.DateTime.ISOYearFormat),
            currentMonth: moment(start).format(CoreConstants.DateTime.ISOMonthFormat).toUpperCase()
        }, () => {
            this.getTradeLog()
            this.getActiveMonths()
        })
    }

    handleMonthChange(e) {
        const d = moment(this.state.currentYear + '-' + e.target.value + '-01', CoreConstants.DateTime.ISODateLongMonthFormat).startOf('month')
        this.setState({
            currentMonth: e.target.value,
            start: d.format(CoreConstants.DateTime.ISODateFormat),
            end: d.add(1, 'months').add(1, 'days').format(CoreConstants.DateTime.ISODateFormat)
        }, () => this.getTradeLog())
    }


    //  GENERAL FUNCTIONS

    async getActiveMonths() {
        try {
            this.setState({isLoading: true})
            const response = await fetch(
                CoreConstants.ApiUrls.TradeRecord.ActiveMonths
                    .replace('{year}', this.state.currentYear)
            )

            const data = await response.json()
            this.setState({
                activeMonths: data.data
            })
        } catch (e) {
            console.log(e)
        }

        this.setState({
            isLoading: false,
        })
    }

    async getTradeLog() {
        try {
            this.setState({isLoading: true})
            const response = await fetch(
                CoreConstants.ApiUrls.TradeRecord.History
                    .replace('{start}', this.state.start)
                    .replace('{end}', this.state.end)
                    .replace('{aggregateInterval}', this.state.interval)
                    .replace('{sortOrder}', 'desc')
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


    //  RENDER FUNCTION

    render() {
        let button
        if (this.state.interval === 'DAILY') {
            button =
                <button className="button" onClick={() => this.handleButtonClick('DAILY')}>
                    <span className="icon">
                        <AiOutlineArrowLeft/>
                    </span>
                    <span>{this.state.currentYear}</span>
                </button>
        } else if (this.state.interval === 'MONTHLY') {
            button =
                <button className="button" onClick={() => this.handleButtonClick('MONTHLY')}>
                    <span className="icon">
                        <AiOutlineArrowLeft/>
                    </span>
                    <span>All-Time</span>
                </button>
        } else {
            button = null
        }

        let select = null
        if (this.state.interval === 'DAILY') {
            select =
                <div className="select">
                    <select value={this.state.currentMonth} onChange={this.handleMonthChange}>
                        {
                            this.state.activeMonths.map((item, key) => {
                                return (
                                    <option key={key} disabled={!item.active} value={item.month}>
                                        {displayString(item.month)}
                                    </option>
                                )
                            })
                        }
                    </select>
                </div>
        }

        return (
            <>
                <Helmet>
                    <title>TraderBuddy | Trade History</title>
                </Helmet>
                <div className="trade-history">
                    <div className="level">
                        <div className="level-left">
                            <div className="level-item">
                                {button}
                            </div>
                        </div>
                        <div className="level-right">
                            <div className="level-item">
                                {select}
                            </div>
                        </div>
                    </div>
                    <div className={"columns is-multiline is-mobile"}>
                        {
                            this.state.trades.map((item, key) => {
                                return (
                                    <div className="column is-12" key={key}>
                                        <TradeLogEntry
                                            tradeRecord={item}
                                            index={key}
                                            selectEntryHandler={this.handleEntrySelect}
                                            listId={key}
                                            shouldAllowTradeList={this.state.interval === 'DAILY'}
                                        />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </>
        );
    }


    //  LIFECYCLE FUNCTIONS

    async componentDidMount() {
        await this.getActiveMonths()
        await this.getTradeLog()
    }
}