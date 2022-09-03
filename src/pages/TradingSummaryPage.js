import React, {Component} from "react";
import TradeComponent from "./trades/TradeComponent";

export default class SummaryPage extends Component {

    static tradeSummaryUrl = 'http://localhost:8080/api/v1/trade-summary'

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            report: [],
            interval: 'daily'
        }
    }


    //  GENERAL FUNCTIONS

    async getTradeSummaryReport() {
        try {
            this.setState({isLoading: true})
            const response = await fetch(SummaryPage.tradeSummaryUrl + '/report?start=2022-08-01T00:00:00&end=2022-09-01T00:00:00&interval=' + this.state.interval);
            const data = await response.json();

            this.setState({
                isLoading: false,
                report: data.data
            })
        } catch (e) {
            this.setState({isLoading: false})
            console.log(e)
        }
    }


    //  RENDER FUNCTION

    render() {
        return (
            <div>
                <section className="hero is-medium">
                    <div className="hero-body">
                        <p className="title">
                            Hero title
                        </p>
                        <p className="subtitle">
                            Hero subtitle
                        </p>
                    </div>
                </section>
                <div className="container">
                    <div className="columns is-multiline">
                        <div className="column is-8-desktop is-offset-2-desktop is-12-tablet is-12-mobile">
                            <div className="box box-border-blue">
                                <h2 className="is-size-5">Daily Target Tracker</h2>
                                <h6 className="is-size-7">August 2022</h6>
                                <hr className="card-hr"/>
                                <table className="table is-striped is-hoverable is-fullwidth is-narrow">
                                    <thead>
                                    <tr>
                                        <th>
                                            <abbr title="Date">Date</abbr>
                                        </th>
                                        <th className="has-text-centered">
                                            <abbr title="Profit Target">Target</abbr>
                                        </th>
                                        <th className="has-text-centered">
                                            <abbr title="Number of Trades"># of Trades</abbr>
                                        </th>
                                        <th className="has-text-centered">
                                            <abbr title="Win Percentage">Win %</abbr>
                                        </th>
                                        <th className="has-text-centered">
                                            <abbr title="Net Profit">Net Profit</abbr>
                                        </th>
                                        <th className="has-text-centered">
                                            <abbr title="Net Profit Percentage">% Net Profit</abbr>
                                        </th>
                                        <th className="has-text-centered">
                                            <abbr title="Surplus/Deficit">Surplus</abbr>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.report.map((item, key) => {
                                                return (
                                                    <TradeComponent date={item.date} target={item.target}
                                                                    numberOfTrades={item.numberOfTrades}
                                                                    winPercentage={item.winPercentage}
                                                                    netProfit={item.netProfit}
                                                                    profitPercentage={item.percentageProfit}
                                                                    surplus={item.surplus}/>
                                                )
                                            }
                                        )
                                    }
                                    </tbody>
                                    <tfoot>
                                    <tr>
                                        <th>
                                            Totals
                                        </th>
                                        <th/>
                                        <th className="has-text-centered">
                                            65
                                        </th>
                                        <th className="has-text-centered">
                                            66
                                        </th>
                                        <th className="has-text-centered">
                                            163.7
                                        </th>
                                        <th className="has-text-centered">
                                            0.0
                                        </th>
                                        <th className="has-text-centered">
                                            0.0
                                        </th>
                                    </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


    //  LIFECYCLE FUNCTIONS

    async componentDidMount() {
        await this.getTradeSummaryReport()
    }
}
