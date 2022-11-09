import React, {Component} from "react";
import AccountOverview from "../components/account/AccountOverview";
import ProfitCurve from "../components/account/performance/ProfitCurve";
import PerformanceStatistics from "../components/account/performance/PerformanceStatistics";
import PerformanceSummary from "../components/account/performance/PerformanceSummary";
import TradeHistory from "../components/trade/history/TradeHistory";
import Retrospective from "../components/retrospective/Retrospective";
import {CoreConstants} from "../constants/coreConstants";

export default class HomePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            recentRetro: {},
        }
    }


    //  GENERAL FUNCTIONS

    async getRecentRetrospective() {
        try {
            this.setState({isLoading: true})
            const response = await fetch(
                CoreConstants.ApiUrls.RecentRetrospective
                    .replace('{interval}', 'WEEKLY')
            )

            const data = await response.json()
            this.setState({
                recentRetro: data.data,
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
        return (
            <div className="home-page">
                <div className="columns is-multiline is-vcentered is-mobile">
                    <div className="column is-4-desktop is-offset-1-desktop is-12-tablet is-12-mobile">
                        <div className="columns is-multiline is-mobile is-vcentered">
                            <div className="column is-12 is-mobile">
                                <AccountOverview/>
                            </div>
                            <div className="column is-12 is-mobile">
                                <PerformanceStatistics />
                            </div>
                        </div>
                    </div>
                    <div className="column is-6-desktop is-12-tablet is-12-mobile">
                        <div className="columns is-multiline is-mobile is-vcentered">
                            <div className="column is-12 is-mobile">
                                <ProfitCurve count={6} />
                            </div>
                            <div className="column is-12 is-mobile">
                                <PerformanceSummary />
                            </div>
                        </div>
                    </div>
                    <div className="column is-10-desktop is-offset-1-desktop is-12-tablet is-12-mobile">
                        <div className="columns is-multiline is-mobile">
                            <div className="column is-7-desktop is-12-tablet is-12-mobile">
                                <Retrospective
                                    interval={'WEEKLY'}
                                    showTotals={false}
                                    isLoading={this.state.isLoading}
                                    retro={this.state.recentRetro}
                                />
                            </div>
                            <div className="column is-5-desktop is-12-tablet is-12-mobile">
                                <TradeHistory count={6} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


    //  LIFECYCLE FUNCTIONS

    async componentDidMount() {
        await this.getRecentRetrospective();
    }
}