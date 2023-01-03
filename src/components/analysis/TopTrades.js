import React, {Component} from "react";
import TopTradesLoader from "../loader/analysis/TopTradesLoader";
import {CoreConstants} from "../../constants/coreConstants";
import moment from "moment";
import {sanitizeText, tradeDuration} from "../../service/FormattingService";

export default class TopTrades extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            start: moment().startOf('month').format(CoreConstants.DateTime.ISODateFormat),
            end: moment().add(1, 'months').startOf('month').format(CoreConstants.DateTime.ISODateFormat),
            trades: []
        }
    }


    //  GENERAL FUNCTIONS

    async getTrades() {
        try {
            this.setState({isLoading: true})
            const response = await fetch(
                CoreConstants.ApiUrls.Analysis.TopTrades
                    .replace('{start}', this.props.start)
                    .replace('{end}', this.props.end)
                    .replace('{sort}', this.props.sort)
                    .replace('{sortByLosses}', this.props.sortByLosses)
                    .replace('{count}', this.props.count)
            )

            const data = await response.json()
            if (data.data) {
                this.setState({
                    trades: data.data,
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
            loader = <TopTradesLoader isLoading={this.state.isLoading}/>
        }

        return (
            <div className="top-trades performance-statistics">
                <div className="card">
                    <div className="card-content">
                        {loader}
                        <div className={"" + (this.state.isLoading ? ' no-show ' : '')}>
                            <h5 className="header">
                                {this.props.title}&nbsp;{this.props.sortByLosses ? 'Lost' : 'Gained'}
                            </h5>
                            <h6 className="sub-header">
                                {moment(this.props.start).format(CoreConstants.DateTime.ISOMonthYearFormat)}
                            </h6>
                            <div className="container">
                                <div className="columns is-multiline is-mobile">

                                    {
                                        this.state.trades && this.state.trades.map((item, key) => {
                                            return (
                                                <div className="column is-12 performance-statistics-entry" key={key}>
                                                    <div className="columns is-multiline is-mobile is-vcentered">
                                                        <div className="column is-8">
                                                            <h6 className="row-entry-small">{moment(item.tradeCloseTime).format(CoreConstants.DateTime.ISOShortMonthDayYearFormat)}</h6>
                                                            <h5 className="row-entry-header">{sanitizeText(item.product)}</h5>
                                                            <h6 className="row-entry-small">
                                                                Duration: {tradeDuration(item.tradeDuration)}
                                                            </h6>
                                                        </div>
                                                        <div className="column is-4 has-text-right">
                                                            <h5 className="value">
                                                                {item[this.props.dataKey]}
                                                            </h5>
                                                            <h6 className="row-entry-small">{item.lotSize}&nbsp;pts</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
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
        await this.getTrades()
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.start !== this.props.start) {
            await this.getTrades()
        }
    }
}