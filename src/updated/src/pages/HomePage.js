import React, {Component} from "react";
import TopBar from "../components/TopBar";
import AccountOverview from "../components/account/AccountOverview";
import ProfitCurve from "../components/account/ProfitCurve";
import PerformanceStatistics from "../components/account/performance/PerformanceStatistics";
import PerformanceSummary from "../components/account/performance/PerformanceSummary";
import TradeHistory from "../components/account/tradehistory/TradeHistory";
import Retrospective from "../components/Retrospective";

export default class HomePage extends Component {


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
                                <Retrospective showTotals={false} />
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
}