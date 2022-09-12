import React, {Component} from "react";
import FooterComponent from "../components/layout/FooterComponent";
import TradingPlanPage from "./TradingPlanPage";

export default class AbstractPage extends Component {


    //  RENDER FUNCTION

    render() {
        return (
            <div>
                {/*<TradingSummaryPage/>*/}
                <TradingPlanPage />
                <FooterComponent />
            </div>
        );
    }
}
