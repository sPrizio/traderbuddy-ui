import React, {Component} from "react";
import PerformanceStatisticsEntry from "./PerformanceStatisticsEntry";
import PerformanceStatisticsLoader from "../../loader/account/performance/PerformanceStatisticsLoader";
import moment from "moment/moment";
import {CoreConstants} from "../../../constants/coreConstants";
import {computeDate} from "../../../service/DateTimeService";

export default class PerformanceStatistics extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            stats: {
                statistics: {
                    largestWinAmount: 0,
                    largestWinSize: 0,
                    largestWinDelta: 0,
                    averageWinAmount: 0,
                    averageWinSize: 0,
                    averageWinDelta: 0,
                    largestLossAmount: 0,
                    largestLossSize: 0,
                    largestLossDelta: 0,
                    averageLossAmount: 0,
                    averageLossSize: 0,
                    averageLossDelta: 0
                }
            }
        }
    }


    //  GENERAL FUNCTIONS

    async getStats() {
        try {
            this.setState({isLoading: true})
            const response = await fetch(
                CoreConstants.ApiUrls.TradeRecord.RecentHistory
                    .replace('{count}', '1')
                    .replace('{aggregateInterval}', 'MONTHLY')
                    .replace('{sortOrder}', 'DESC')
            )

            const data = await response.json()
            if (data.data && data.data.length > 0) {
                this.setState({
                    stats: data.data[0],
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
            loader = <PerformanceStatisticsLoader isLoading={this.state.isLoading} />
        }

        return (
            <div className="performance-statistics">
                <div className="card">
                    <div className="card-content">
                        {loader}
                        <div className={"" + (this.state.isLoading ? ' no-show ' : '')}>
                            <h5 className="header">Statistics</h5>
                            <h6 className="sub-header">{computeDate(this.state.stats.startDate, this.state.stats.endDate, this.state.stats.aggregateInterval)}</h6>
                            <div className="container">
                                <div className="columns is-multiline is-mobile is-vcentered">
                                    <PerformanceStatisticsEntry
                                        label={'Biggest Win'}
                                        delta={this.state.stats.statistics.largestWinDelta}
                                        value={this.state.stats.statistics.largestWinAmount}
                                        valuePercentage={this.state.stats.statistics.largestWinSize}
                                        sentiment={"positive"}
                                    />
                                    <PerformanceStatisticsEntry
                                        label={'Average Win'}
                                        delta={this.state.stats.statistics.averageWinDelta}
                                        value={this.state.stats.statistics.averageWinAmount}
                                        valuePercentage={this.state.stats.statistics.averageWinSize}
                                        sentiment={"positive"}
                                    />
                                    <PerformanceStatisticsEntry
                                        label={'Biggest Loss'}
                                        delta={this.state.stats.statistics.largestLossDelta}
                                        value={this.state.stats.statistics.largestLossAmount}
                                        valuePercentage={this.state.stats.statistics.largestLossSize}
                                        sentiment={"negative"}
                                    />
                                    <PerformanceStatisticsEntry
                                        label={'Average Loss'}
                                        delta={this.state.stats.statistics.averageLossDelta}
                                        value={this.state.stats.statistics.averageLossAmount}
                                        valuePercentage={this.state.stats.statistics.averageLossSize}
                                        sentiment={"negative"}
                                    />
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
        await this.getStats()
    }
}