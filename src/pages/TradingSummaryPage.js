import React, {Component} from "react";
import TradeTotalsComponent from "../components/trades/overview/TradeTotalsComponent";
import HeroComponent from "../components/layout/HeroComponent";
import FileImportComponent from "../components/FileImportComponent";
import GridComponent from "../components/layout/grid/GridComponent";
import moment from "moment";

export default class TradingSummaryPage extends Component {

    static tradeSummaryUrl = 'http://localhost:8080/api/v1/trade-summary'
    static disregardTradeUrl = 'http://localhost:8080/api/v1/trades/disregard'

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            report: [],
            totals: {},
            interval: 'daily',
            startDate: moment().startOf('month').format('YYYY-MM-DDTHH:mm:ss'),
            endDate: moment().add(1, 'months').startOf('month').format('YYYY-MM-DDTHH:mm:ss')
        }

        this.handleStartAndEndDateChanges = this.handleStartAndEndDateChanges.bind(this)
        this.resetViewHandler = this.resetViewHandler.bind(this)
        this.disregardTrade = this.disregardTrade.bind(this)
    }


    //  HANDLERS

    handleStartAndEndDateChanges(st, ed, interval) {
        this.setState({startDate: st, endDate: ed, interval: interval}, () => this.getTradeSummaryReport())
    }

    resetViewHandler(val) {
        this.setState({
            startDate: moment().startOf('year').format('YYYY-MM-DDTHH:mm:ss'),
            endDate: moment().add(1, 'years').startOf('year').format('YYYY-MM-DDTHH:mm:ss'),
            interval: val === 'month' ?  'monthly' : 'yearly'
        }, () => this.getTradeSummaryReport())
    }

    async disregardTrade(val) {
        try {
            const requestOptions = {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({tradeId: val})
            };
            const response = await fetch(TradingSummaryPage.disregardTradeUrl, requestOptions);
            const data = await response.json();

            console.log(data.data)

            if (data.data) {
                await this.getTradeSummaryReport()
            }
        } catch (e) {
            console.log(e)
        }
    }


    //  GENERAL FUNCTIONS

    async getTradeSummaryReport() {
        try {
            this.setState({isLoading: true})
            const response = await fetch(TradingSummaryPage.tradeSummaryUrl + '/report?start=' + this.state.startDate + '&end=' + this.state.endDate + '&interval=' + this.state.interval);
            const data = await response.json();

            this.setState({
                isLoading: false,
                report: data.data.records,
                totals: data.data.statistics
            })
        } catch (e) {
            this.setState({isLoading: false})
            console.log(e)
        }
    }


    //  RENDER FUNCTION

    render() {
        let centralDisplay
        if (this.state.report && this.state.report.length > 0) {
            centralDisplay =
                <div className="container">
                    <hr className="card-hr card-hr-colored"/>
                    <GridComponent records={this.state.report} interval={this.state.interval}
                                   dateChangeHandler={this.handleStartAndEndDateChanges}
                                   disregardHandler={this.disregardTrade} currentDate={this.state.startDate}
                                   resetViewHandler={this.resetViewHandler}/>
                    <hr className="card-hr card-hr-colored"/>
                    <TradeTotalsComponent totals={this.state.totals}/>
                </div>
        } else {
            centralDisplay =
                <div className="container">
                    <p className="has-text-centered">Looks like you don't have any trading history. You can start by
                        adding some trades.<br/>You can even import trades from your trading platform!</p>
                </div>
        }

        return (
            <div className="min-height-for-footer">
                <HeroComponent title={"Trading History"} subtitle={"A look at your trading history"}>
                    <FileImportComponent/>
                </HeroComponent>
                {centralDisplay}
            </div>
        );
    }


    //  LIFECYCLE FUNCTIONS

    async componentDidMount() {
        await this.getTradeSummaryReport()
    }
}
