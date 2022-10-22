import React, {Component} from "react";
import {formatNumberForDisplay} from "../service/FormattingService";
import moment from "moment/moment";
import {AiOutlineArrowLeft} from "react-icons/ai";

export default class ForecastingPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedInterval: 'DAILY'
        }
    }


    //  GENERAL FUNCTIONS

    displayDate(val) {
        let dateDisplay = <span className="value">{moment(val).format('YYYY')}</span>
        if (this.state.selectedInterval === 'DAILY') {
            const day = moment(val).format('Do').match('(\\d+)([a-zA-z]+)')
            dateDisplay =
                <div>
                    <span className="sub-header">{moment(val).format('MMMM')}</span>
                    <br/>
                    <span className="value">
                        {day[1]}<sup>{day[2]}</sup>
                    </span>
                </div>
        } else if (this.state.selectedInterval === 'MONTHLY') {
            dateDisplay = <span className="value">{moment(val).format('MMMM')}</span>
        }

        return dateDisplay
    }

    computeBackwardButton() {
        switch (this.state.selectedInterval) {
            case "DAILY":
                return (
                    <button className="button">
                        <span className="icon">
                            <AiOutlineArrowLeft/>
                        </span>
                        <span>2022</span>
                    </button>
                )
            case "MONTHLY":
                return (
                    <button className="button">
                        <span className="icon">
                            <AiOutlineArrowLeft/>
                        </span>
                        <span>All-time</span>
                    </button>
                )
            default:
                return null
        }
    }


    //  RENDER FUNCTION

    render() {
        return (
            <div className="forecasting-page">
                <div className="card">
                    <div className="card-content">
                        <div className="columns is-multiline is-vcentered is-mobile">
                            <div className="column is-5">
                                <h5 className="header">Trading Plan</h5>
                                <h6 className="sub-header">Forecasting & Performance Tracking</h6>
                            </div>
                            <div className="column is-2">
                                <div className="has-text-centered">
                                    {this.computeBackwardButton()}
                                </div>
                            </div>
                            <div className="column is-5">
                                <div className="has-text-right">
                                    <h5 className="header">Period</h5>
                                    <h6 className="sub-header">October 2022</h6>
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="columns is-multiline is-mobile">
                                <div className="column is-6 border-right">
                                    <div className="table-container">
                                        <table className="table is-fullwidth is-striped is-narrow">
                                            <thead>
                                            <tr>
                                                <th className="has-text-left">Date</th>
                                                <th className="has-text-centered">Credits</th>
                                                <th className="has-text-centered">Earnings</th>
                                                <th className="has-text-centered">Net</th>
                                                <th className="has-text-centered">Debits</th>
                                                <th className="has-text-centered">Balance</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td className="has-text-left">{this.displayDate('2022-10-03')}</td>
                                                <td className="has-text-centered">{formatNumberForDisplay(350.00)}</td>
                                                <td className="has-text-centered">{formatNumberForDisplay(31.99)}</td>
                                                <td className="has-text-centered">{formatNumberForDisplay(31.99)}</td>
                                                <td className="has-text-centered">{formatNumberForDisplay(0)}</td>
                                                <td className="has-text-centered">{formatNumberForDisplay(2590.93)}</td>
                                            </tr>
                                            <tr>
                                                <td className="has-text-left">{this.displayDate('2022-10-04')}</td>
                                                <td className="has-text-centered">{formatNumberForDisplay(0)}</td>
                                                <td className="has-text-centered">{formatNumberForDisplay(32.39)}</td>
                                                <td className="has-text-centered">{formatNumberForDisplay(64.38)}</td>
                                                <td className="has-text-centered">{formatNumberForDisplay(0)}</td>
                                                <td className="has-text-centered">{formatNumberForDisplay(2623.32)}</td>
                                            </tr>
                                            <tr>
                                                <td className="has-text-left">{this.displayDate('2022-10-05')}</td>
                                                <td className="has-text-centered">{formatNumberForDisplay(0)}</td>
                                                <td className="has-text-centered">{formatNumberForDisplay(32.79)}</td>
                                                <td className="has-text-centered">{formatNumberForDisplay(97.17)}</td>
                                                <td className="has-text-centered">{formatNumberForDisplay(0)}</td>
                                                <td className="has-text-centered">{formatNumberForDisplay(2656.11)}</td>
                                            </tr>
                                            <tr className="is-active">
                                                <td className="has-text-left">{this.displayDate('2022-10-06')}</td>
                                                <td className="has-text-centered">{formatNumberForDisplay(0)}</td>
                                                <td className="has-text-centered">{formatNumberForDisplay(33.20)}</td>
                                                <td className="has-text-centered">{formatNumberForDisplay(130.37)}</td>
                                                <td className="has-text-centered">{formatNumberForDisplay(0)}</td>
                                                <td className="has-text-centered">{formatNumberForDisplay(2689.31)}</td>
                                            </tr>
                                            <tr>
                                                <td className="has-text-left">{this.displayDate('2022-10-07')}</td>
                                                <td className="has-text-centered">{formatNumberForDisplay(0)}</td>
                                                <td className="has-text-centered">{formatNumberForDisplay(33.62)}</td>
                                                <td className="has-text-centered">{formatNumberForDisplay(163.99)}</td>
                                                <td className="has-text-centered">{formatNumberForDisplay(0)}</td>
                                                <td className="has-text-centered">{formatNumberForDisplay(2722.93)}</td>
                                            </tr>
                                            <tr>
                                                <td className="has-text-left">{this.displayDate('2022-10-08')}</td>
                                                <td className="has-text-centered">{formatNumberForDisplay(0)}</td>
                                                <td className="has-text-centered">{formatNumberForDisplay(34.04)}</td>
                                                <td className="has-text-centered">{formatNumberForDisplay(198.03)}</td>
                                                <td className="has-text-centered">{formatNumberForDisplay(0)}</td>
                                                <td className="has-text-centered">{formatNumberForDisplay(2756.97)}</td>
                                            </tr>
                                            </tbody>
                                            <tfoot>
                                            <tr>
                                                <th className="has-text-left">
                                                    <strong>Totals</strong>
                                                </th>
                                                <th className="has-text-centered">
                                                    <strong>{formatNumberForDisplay(350)}</strong>
                                                </th>
                                                <th className="has-text-centered">
                                                    <strong>{formatNumberForDisplay(762.73)}</strong>
                                                </th>
                                                <th className="has-text-centered">
                                                    <strong>{formatNumberForDisplay(1112.73)}</strong>
                                                </th>
                                                <th className="has-text-centered">
                                                    <strong>{formatNumberForDisplay(0)}</strong>
                                                </th>
                                                <th className="has-text-centered">
                                                    <strong>{formatNumberForDisplay(3321.67)}</strong>
                                                </th>
                                            </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                                <div className="column is-6 border-left">
                                    <div className="table-container">
                                        <table className="table is-fullwidth is-striped is-narrow">
                                            <thead>
                                            <tr>
                                                <th className="has-text-centered">Trades</th>
                                                <th className="has-text-centered">Win %</th>
                                                <th className="has-text-centered">Profit</th>
                                                <th className="has-text-centered">Gain (%)</th>
                                                <th className="has-text-centered">Surplus</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td className="has-text-centered">3</td>
                                                <td className="has-text-centered">67</td>
                                                <td className="has-text-centered">{formatNumberForDisplay(56.34)}</td>
                                                <td className="has-text-centered">{formatNumberForDisplay(2.15)}</td>
                                                <td className="has-text-centered">{formatNumberForDisplay(23.55)}</td>
                                            </tr>
                                            <tr>
                                                <td className="has-text-centered">3</td>
                                                <td className="has-text-centered">100</td>
                                                <td className="has-text-centered">{formatNumberForDisplay(41.09)}</td>
                                                <td className="has-text-centered">{formatNumberForDisplay(1.55)}</td>
                                                <td className="has-text-centered">{formatNumberForDisplay(7.89)}</td>
                                            </tr>
                                            <tr>
                                                <td className="has-text-centered">6</td>
                                                <td className="has-text-centered">50</td>
                                                <td className="has-text-centered">{formatNumberForDisplay(37.15)}</td>
                                                <td className="has-text-centered">{formatNumberForDisplay(1.38)}</td>
                                                <td className="has-text-centered">{formatNumberForDisplay(3.53)}</td>
                                            </tr>
                                            <tr className="is-active">
                                                <td className="has-text-centered">6</td>
                                                <td className="has-text-centered">50</td>
                                                <td className="has-text-centered">{formatNumberForDisplay(24.01)}</td>
                                                <td className="has-text-centered">{formatNumberForDisplay(0.88)}</td>
                                                <td className="has-text-centered">{formatNumberForDisplay(-10.03)}</td>
                                            </tr>
                                            <tr>
                                                <td className="has-text-centered">18</td>
                                                <td className="has-text-centered">56</td>
                                                <td className="has-text-centered">{formatNumberForDisplay(49.80)}</td>
                                                <td className="has-text-centered">{formatNumberForDisplay(1.81)}</td>
                                                <td className="has-text-centered">{formatNumberForDisplay(15.34)}</td>
                                            </tr>
                                            <tr>
                                                <td className="has-text-centered">8</td>
                                                <td className="has-text-centered">50</td>
                                                <td className="has-text-centered">{formatNumberForDisplay(35.49)}</td>
                                                <td className="has-text-centered">{formatNumberForDisplay(1.27)}</td>
                                                <td className="has-text-centered">{formatNumberForDisplay(0.60)}</td>
                                            </tr>
                                            </tbody>
                                            <tfoot>
                                            <tr>
                                                <th className="has-text-centered">
                                                    <strong>{formatNumberForDisplay(108)}</strong>
                                                </th>
                                                <th className="has-text-centered">
                                                    <strong>{formatNumberForDisplay(68)}</strong>
                                                </th>
                                                <th className="has-text-centered">
                                                    <strong>{formatNumberForDisplay(482.27)}</strong>
                                                </th>
                                                <th className="has-text-centered">
                                                    <strong>{formatNumberForDisplay(1.63)}</strong>
                                                </th>
                                                <th className="has-text-centered">
                                                    <strong>{formatNumberForDisplay(18.33)}</strong>
                                                </th>
                                            </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}