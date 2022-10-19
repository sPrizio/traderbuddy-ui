import React, {Component} from "react";

export default class PerformanceSummary extends Component {

    //  RENDER FUNCTION

    render() {
        return (
            <div className="performance-summary">
                <div className="card">
                    <div className="card-content">
                        <h5 className="header">Summary</h5>
                        <h6 className="sub-header">October 2022</h6>
                        <div className="container">
                            <nav className="level is-mobile">
                                <div className="level-item has-text-centered">
                                    <div>
                                        <p className="sub-header">Trades</p>
                                        <p className="value">94</p>
                                    </div>
                                </div>
                                <div className="level-item has-text-centered">
                                    <div>
                                        <p className="sub-header">Trading Rate</p>
                                        <p className="value">8.74</p>
                                    </div>
                                </div>
                                <div className="level-item has-text-centered">
                                    <div>
                                        <p className="sub-header">Win %</p>
                                        <p className="value">59</p>
                                    </div>
                                </div>
                                <div className="level-item has-text-centered">
                                    <div>
                                        <p className="sub-header">P & L</p>
                                        <p className="value">389.21</p>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
