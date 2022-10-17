import React, {Component} from "react";
import {getDomain} from "../../../services/ConfigurationService"
import {formatNumberForDisplay} from "../../../services/FormattingService";
import moment from "moment";

export default class RecentTradesComponent extends Component {

    static fetchRecentTradesUrl = getDomain() + '/trades/recent'

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            recentTrades: []
        }
    }


    //  GENERAL FUNCTIONS

    async getRecentTrades() {
        try {
            this.setState({isLoading: true})
            const response = await fetch(RecentTradesComponent.fetchRecentTradesUrl + '?count=' + this.props.numberOfTrades)
            const data = await response.json()

            this.setState({
                isLoading: false,
                recentTrades: data.data
            })
        } catch (e) {
            this.setState({isLoading: false})
            console.log(e)
        }
    }


    //  RENDER FUNCTION

    render() {
        let listDisplay;
        if (this.state.recentTrades && this.state.recentTrades.length > 0) {
            listDisplay =
                <table className="table is-fullwidth is-striped">
                    <thead>
                    <tr>
                        <th className="has-text-left">Date</th>
                        <th className="has-text-centered">Trades</th>
                        <th className="has-text-centered">Win%</th>
                        <th className="has-text-centered">Net Profit</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.recentTrades.map((item, key) => {
                            return (
                                <tr key={key}>
                                    <td className="has-text-left">{moment(item.start).format('MMM Do, YYYY')}</td>
                                    <td className="has-text-centered">{item.totalNumberOfTrades}</td>
                                    <td className="has-text-centered">{item.winPercentage}</td>
                                    <td className="has-text-centered">{formatNumberForDisplay(item.netProfit)}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
        } else {
            listDisplay =
                <p className="has-text-centered">You don't have any trading history. Add some trades or even import them
                    from your favorite broker!</p>
        }

        return (
            <div className="box box-border-green">
                <h2 className="is-size-5">History</h2>
                <hr className="card-hr"/>
                {listDisplay}
            </div>
        );
    }


    //  LIFECYCLE FUNCTIONS

    async componentDidMount() {
        await this.getRecentTrades()
    }
}