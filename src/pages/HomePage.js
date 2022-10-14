import React, {Component} from "react";
import RecentTradesComponent from "../components/trades/overview/RecentTradesComponent";
import PerformanceSummaryComponent from "../components/layout/home/PerformanceSummaryComponent";

export default class HomePage extends Component {


    //  RENDER FUNCTION

    render() {
        return (
            <div className="min-height-for-footer">
                <div className="container is-fluid">
                    <br /><br/>
                    <div className="columns is-multiline">
                        <div className="column is-3-desktop is-12-tablet is-12-mobile is-offset-1-desktop">
                            <div className="columns is-multiline">
                                <div className="column is-12">
                                    <article className="notification is-warning">
                                        <p className="title">...tiles</p>
                                        <p className="subtitle">Bottom tile</p>
                                    </article>
                                    <PerformanceSummaryComponent />
                                </div>
                            </div>
                        </div>
                        <div className="column is-4-desktop is-12-tablet is-12-mobile">
                            <div className="columns is-multiline">
                                <div className="column is-12">
                                    <article className="notification is-info">
                                        <p className="title">Middle tile</p>
                                    </article>
                                </div>
                            </div>
                        </div>
                        <div className="column is-3-desktop is-12-tablet is-12-mobile">
                            <div className="columns is-multiline">
                                <div className="column is-12">
                                    <article className="tile is-child">
                                        <RecentTradesComponent numberOfTrades={7} />
                                    </article>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}