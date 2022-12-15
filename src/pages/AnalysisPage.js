import React, {Component} from "react";
import {Helmet} from "react-helmet";
import TopTradesByPips from "../components/analysis/TopTradesByPips";
import TopTradesByProfit from "../components/analysis/TopTradesByProfit";
import TradeRecapCandleChart from "../components/trade/recap/TradeRecapCandleChart";

export default class AnalysisPage extends Component {


    //  RENDER FUNCTION

    render() {
        return (
            <>
                <Helmet>
                    <title>TraderBuddy | Analysis</title>
                </Helmet>
                <div className="analysis-page">
                    <div className="columns is-multiline is-mobile">
                        <div className="column is-12">
                            <TradeRecapCandleChart tradeId={'O1-BS-6Z0R6N'} />
                        </div>
                        <div className="column is-3-desktop is-12-tablet is-12-mobile">
                            <TopTradesByPips count={5} sortByLosses={false}/>
                        </div>
                        <div className="column is-3-desktop is-12-tablet is-12-mobile">
                            <TopTradesByPips count={5} sortByLosses={true}/>
                        </div>
                        <div className="column is-3-desktop is-12-tablet is-12-mobile">
                            <TopTradesByProfit count={5} sortByLosses={false}/>
                        </div>
                        <div className="column is-3-desktop is-12-tablet is-12-mobile">
                            <TopTradesByProfit count={5} sortByLosses={true}/>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}