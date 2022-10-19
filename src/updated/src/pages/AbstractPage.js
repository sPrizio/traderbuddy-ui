import React, {Component} from "react";
import HomePage from "./HomePage";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default class AbstractPage extends Component {


    //  RENDER FUNCTION

    render() {
        return (
            <div className="abstract-page">
                <NavBar />
                <div className="container global-container">
                    <div className="columns is-multiline is-mobile">
                        <div className="column is-12-desktop is-12-tablet is-12-mobile">
                            <HomePage />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}