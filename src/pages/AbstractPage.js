import React, {Component} from "react";
import TradingSummaryPage from "./TradingSummaryPage";
import FooterComponent from "../components/layout/FooterComponent";

export default class AbstractPage extends Component {


    //  RENDER FUNCTION

    render() {
        return (
            <div>
                <TradingSummaryPage/>
                <FooterComponent />
            </div>
        );
    }
}
