import React, {Component} from "react";
import {AiOutlineArrowLeft} from "react-icons/ai";
import TradeLogEntry from "../components/trade/log/entry/TradeLogEntry";
import {CoreConstants} from "../constants/coreConstants";
import moment from "moment";
import {displayString} from "../service/FormattingService";

export default class TradeHistoryPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            start: moment().startOf('month').format('YYYY-MM-DD'),
            end: moment().add(1, 'months').startOf('month').format('YYYY-MM-DD'),
            interval: 'DAILY',
            trades: [],
            activeYears: [],
            activeMonths: [],
            currentMonth: moment().format('MMMM').toUpperCase(),
            currentYear: moment().format('YYYY')
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
            st = moment().startOf('year').format('YYYY-MM-DD')
            en = moment().startOf('year').add(2, 'years').format('YYYY-MM-DD')
        } else if (value === 'MONTHLY') {
            val = 'YEARLY'
            st = moment().startOf('year').subtract(100, 'years').format('YYYY-MM-DD')
            en = moment().startOf('year').add(2, 'years').format('YYYY-MM-DD')
        } else {
            val = 'DAILY'
            st = moment().startOf('month').format('YYYY-MM-DD')
            en = moment().startOf('month').add(1, 'month').format('YYYY-MM-DD')
        }

        this.setState({
            interval: val,
            start: st,
            end: en
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
            end: end
        }, () => this.getTradeLog())
    }

    handleMonthChange(e) {
        const d = moment().month(e.target.value).startOf('month')
        this.setState({
            currentMonth: e.target.value,
            start: d.format('YYYY-MM-DD'),
            end: d.add(1, 'months').format('YYYY-MM-DD')
        }, () => this.getTradeLog())
    }


    //  GENERAL FUNCTIONS

    async getActiveMonths() {
        try {
            this.setState({isLoading: true})
            const response = await fetch(
                CoreConstants.ApiUrls.ActiveMonths
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
                CoreConstants.ApiUrls.TradeHistory
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
                                    />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        );
    }


    //  LIFECYCLE FUNCTIONS

    async componentDidMount() {
        await this.getActiveMonths()
        await this.getTradeLog()
    }
}