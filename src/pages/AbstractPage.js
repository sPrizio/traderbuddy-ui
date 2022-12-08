import React, {Component} from "react";
import HomePage from "./HomePage";
import NavBar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";
import TradeHistoryPage from "./TradeHistoryPage";
import ForecastingPage from "./ForecastingPage";
import RetrospectivesPage from "./RetrospectivesPage";
import { Helmet } from 'react-helmet';

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
            case "history":
                currentPage = <TradeHistoryPage/>
                break
            case "forecasting":
                currentPage = <ForecastingPage/>
                break
            case "retrospectives":
                currentPage = <RetrospectivesPage />
                break
            default:
                currentPage = <HomePage/>
                break
        }

        return (
            <>
                <Helmet>
                    <title>TraderBuddy</title>
                </Helmet>
                <div className="abstract-page">
                    <NavBar pageChangeHandler={this.handlePageChange}/>
                    <div className="container global-container">
                        <div className="columns is-multiline is-mobile">
                            <div className="column is-12-desktop is-12-tablet is-12-mobile">
                                {currentPage}
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>
            </>
        );
    }
}