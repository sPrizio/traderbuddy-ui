import React, {Component} from "react";
import FooterComponent from "../components/layout/FooterComponent";
import TradingPlanPage from "./TradingPlanPage";
import TradingSummaryPage from "./TradingSummaryPage";
import RetrospectivePage from "./RetrospectivePage";
import NavbarComponent from "../components/layout/navigation/NavbarComponent";
import HomePage from "./HomePage";

export default class AbstractPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentPage: 'home'
        }

        this.handlePageChange = this.handlePageChange.bind(this)
    }


    //  HANDLER FUNCTIONS

    handlePageChange(val) {
        this.setState({currentPage: val})
    }


    //  RENDER FUNCTION

    render() {
        let currentPage;
        switch (this.state.currentPage) {
            case "summary":
                currentPage = <TradingSummaryPage />
                break
            case "planning":
                currentPage = <TradingPlanPage />
                break
            case "retro":
                currentPage = <RetrospectivePage />
                break
            default:
                currentPage = <HomePage />
                break
        }

        return (
            <div>
                <NavbarComponent pageChangeHandler={this.handlePageChange} />
                {currentPage}
                <FooterComponent />
            </div>
        );
    }
}
