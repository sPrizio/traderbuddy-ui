import React, {Component} from "react";
import FooterComponent from "../components/layout/FooterComponent";
import TradingPlanPage from "./TradingPlanPage";
import TradingSummaryPage from "./TradingSummaryPage";
import RetrospectivePage from "./RetrospectivePage";

export default class AbstractPage extends Component {


    //  RENDER FUNCTION

    render() {
        return (
            <div>
                <RetrospectivePage />
                {/*<TradingSummaryPage/>*/}
                {/*<TradingPlanPage />*/}
                <FooterComponent />
            </div>
        );
    }
}
