import React, {Component} from "react";
import {formatNumberForDisplay, tradeDuration} from "../../service/FormattingService";
import AverageValuesLoader from "../loader/analysis/AverageValuesLoader";
import {CoreConstants} from "../../constants/coreConstants";
import moment from "moment";

export default class AverageValues extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            average: {}
        }
    }


    //  GENERAL FUNCTIONS

    async getAverage() {
        try {
            this.setState({isLoading: true})
            const response = await fetch(
                CoreConstants.ApiUrls.Analysis.Average
                    .replace('{start}', this.props.start)
                    .replace('{end}', this.props.end)
                    .replace('{win}', this.props.isWin)
                    .replace('{count}', '-1')
            )

            const data = await response.json()
            if (data.data) {
                this.setState({
                    average: data.data,
                })
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
        let loader = null
        if (this.state.isLoading) {
            loader = <AverageValuesLoader isLoading={this.state.isLoading}/>
        }

        return (
            <div className="performance-statistics">
                <div className="card">
                    <div className="card-content">
                        {loader}
                        <div className={"" + (this.state.isLoading ? ' no-show ' : '')}>
                            <h5 className="header">
                                {this.props.isWin ? 'Win' : 'Loss'}&nbsp;Averages
                            </h5>
                            <h6 className="sub-header">
                                {moment(this.props.start).format(CoreConstants.DateTime.ISOMonthYearFormat)}
                            </h6>
                            <div className="container">
                                <div className="columns is-multiline is-mobile">
                                    <div className="column is-12 performance-statistics-entry">
                                        <div className="columns is-multiline is-mobile is-vcentered">
                                            <div className="column is-8">
                                                <h5 className="row-entry-header">Average Pips</h5>
                                                <h6 className="row-entry-small">Total Pips:&nbsp;{formatNumberForDisplay(this.state.average.totalPips)}</h6>
                                            </div>
                                            <div className="column is-4 has-text-right">
                                                <h5 className="value">
                                                    {formatNumberForDisplay(this.state.average.averagePips)}
                                                </h5>
                                                <h6 className="row-entry-small">Average Size:&nbsp;{formatNumberForDisplay(this.state.average.averageLotSize)}&nbsp;pts</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="column is-12 performance-statistics-entry">
                                        <div className="columns is-multiline is-mobile is-vcentered">
                                            <div className="column is-8">
                                                <h5 className="row-entry-header">
                                                    Average&nbsp;{this.props.isWin ? 'Win' : 'Loss'}&nbsp;Percentage
                                                </h5>
                                                <h6 className="row-entry-small">
                                                    {formatNumberForDisplay(this.state.average.tradingRate)}&nbsp;{this.props.isWin ? 'wins' : 'losses'}&nbsp;per day
                                                </h6>
                                            </div>
                                            <div className="column is-4 has-text-right">
                                                <h5 className="value">
                                                    {this.state.average.winLossPercentage}%
                                                </h5>
                                                <h6 className="row-entry-small">
                                                    {this.state.average.numberOfWinLosses} {this.props.isWin ? 'wins' : 'losses'}&nbsp;of {this.state.average.totalTrades} trades
                                                </h6>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        this.props.isWin ?
                                            <div className="column is-12 performance-statistics-entry">
                                                <div className="columns is-multiline is-mobile is-vcentered">
                                                    <div className="column is-8">
                                                        <h5 className="row-entry-header">Profitability</h5>
                                                    </div>
                                                    <div className="column is-4 has-text-right">
                                                        <h5 className="value">
                                                            {formatNumberForDisplay(this.state.average.profitability)}
                                                        </h5>
                                                    </div>
                                                </div>
                                            </div>
                                        : null
                                    }
                                    <div className="column is-12 performance-statistics-entry">
                                        <div className="columns is-multiline is-mobile is-vcentered">
                                            <div className="column is-8">
                                                <h5 className="row-entry-header">Average Duration</h5>
                                                <h6 className="row-entry-small">Format [hours : minutes : seconds]</h6>
                                            </div>
                                            <div className="column is-4 has-text-right">
                                                <h5 className="value">
                                                    {tradeDuration(this.state.average.averageTradeDuration)}
                                                </h5>
                                                <h6 className="row-entry-small">Average: {tradeDuration(this.state.average.totalAverageDuration)}</h6>
                                            </div>
                                        </div>
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

    async componentDidMount() {
        await this.getAverage()
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.start !== this.props.start) {
            await this.getAverage()
        }
    }
}