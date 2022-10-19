import React, {Component} from "react";
import PerformanceStatisticsEntry from "./PerformanceStatisticsEntry";

export default class PerformanceStatistics extends Component {


    //  RENDER FUNCTION

    render() {
        return (
            <div className="performance-statistics">
                <div className="card">
                    <div className="card-content">
                        <h5 className="header">Statistics</h5>
                        <h6 className="sub-header">October 2022</h6>
                        <div className="container">
                            <div className="columns is-multiline is-mobile is-vcentered">
                                <PerformanceStatisticsEntry
                                    label={'Biggest Win'}
                                    delta={12.36}
                                    value={61.32}
                                    valuePercentage={2.0}
                                    sentiment={"positive"}
                                />
                                <PerformanceStatisticsEntry
                                    label={'Average Win'}
                                    delta={7.12}
                                    value={21.89}
                                    valuePercentage={1.3}
                                    sentiment={"positive"}
                                />
                                <PerformanceStatisticsEntry
                                    label={'Biggest Loss'}
                                    delta={11.45}
                                    value={47.56}
                                    valuePercentage={2.0}
                                    sentiment={"negative"}
                                />
                                <PerformanceStatisticsEntry
                                    label={'Average Loss'}
                                    delta={-5.8}
                                    value={17.78}
                                    valuePercentage={1.2}
                                    sentiment={"positive"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}