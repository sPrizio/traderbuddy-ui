import React, {Component} from "react";
import {Helmet} from "react-helmet";
import TopTradesByPips from "../components/analysis/TopTradesByPips";
import TopTradesByProfit from "../components/analysis/TopTradesByProfit";
import AverageValues from "../components/analysis/AverageValues";
import moment from "moment";
import {CoreConstants} from "../constants/coreConstants";
import BucketGraph from "../components/analysis/BucketGraph";

export default class AnalysisPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            start: moment().startOf('month').format(CoreConstants.DateTime.ISODateFormat),
            end: moment().add(1, 'months').startOf('month').format(CoreConstants.DateTime.ISODateFormat),
        }
    }


    //  RENDER FUNCTION

    render() {
        return (
            <>
                <Helmet>
                    <title>TraderBuddy | Analysis</title>
                </Helmet>
                <div className="analysis-page">
                    <div className="columns is-multiline is-mobile">
                        <div className="column is-12-desktop is-12-tablet is-12-mobile">
                            <BucketGraph start={this.state.start} end={this.state.end} code={'5m'} />
                        </div>
                        <div className="column is-6-desktop is-12-tablet is-12-mobile">
                            <AverageValues isWin={true} start={this.state.start} end={this.state.end}/>
                        </div>
                        <div className="column is-6-desktop is-12-tablet is-12-mobile">
                            <AverageValues isWin={false} start={this.state.start} end={this.state.end}/>
                        </div>
                        <div className="column is-3-desktop is-12-tablet is-12-mobile">
                            <TopTradesByPips count={5} sortByLosses={false} start={this.state.start}
                                             end={this.state.end}/>
                        </div>
                        <div className="column is-3-desktop is-12-tablet is-12-mobile">
                            <TopTradesByPips count={5} sortByLosses={true} start={this.state.start}
                                             end={this.state.end}/>
                        </div>
                        <div className="column is-3-desktop is-12-tablet is-12-mobile">
                            <TopTradesByProfit count={5} sortByLosses={false} start={this.state.start}
                                               end={this.state.end}/>
                        </div>
                        <div className="column is-3-desktop is-12-tablet is-12-mobile">
                            <TopTradesByProfit count={5} sortByLosses={true} start={this.state.start}
                                               end={this.state.end}/>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}