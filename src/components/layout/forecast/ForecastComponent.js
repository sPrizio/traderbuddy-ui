import React, {Component} from "react";
import moment from "moment";
import {formatNumberForDisplay} from "../../../services/FormattingService"
import "@creativebulma/bulma-tooltip/dist/bulma-tooltip.min.css";
import {BsQuestionCircleFill} from "react-icons/bs";
import {IoReturnUpBackOutline} from "react-icons/io5";

export default class ForecastComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedForecastInterval: 'Daily'
        }

        this.handleForecastIntervalChange = this.handleForecastIntervalChange.bind(this);
    }


    //  HANDLER FUNCTIONS

    handleForecastIntervalChange(event) {
        this.props.intervalChangeHandler(event.target.value)
        this.setState({selectedForecastInterval: event.target.value})
    }


    //  GENERAL FUNCTIONS

    computeDateHeader() {
        switch (this.props.interval) {
            case 'DAILY':
                return moment(this.props.selectedDate).format('MMMM yyyy')
            case 'WEEKLY':
            case 'MONTHLY':
                return moment(this.props.selectedDate).format('yyyy')
            default:
                return ''
        }
    }

    computeDateDisplay(val1, val2) {
        switch (this.props.interval) {
            case 'DAILY':
                return moment(val1).format('MMM Do')
            case 'WEEKLY':
                return moment(val1).format('MMM Do') + ' - ' + moment(val2).subtract(1, 'day').format('Do')
            case 'MONTHLY':
                return moment(val1).format('MMMM')
            case 'YEARLY':
                return moment(val1).format('yyyy')
            default:
                return val1
        }
    }


    //  RENDER FUNCTION

    render() {
        let returnButton;
        if (this.state.selectedForecastInterval === 'Daily') {
            returnButton =
                <p className="has-text-left is-text-blue has-text-weight-medium back-link-hover is-size-6-half"
                   onClick={() => {
                       this.setState({selectedForecastInterval: 'Monthly'})
                       this.props.resetHandler()
                   }}>
                            <span className="icon-text back-link-hover">
                                <span className="icon">
                                    <IoReturnUpBackOutline/>
                                </span>
                                <span className="back-link-hover">Monthly Forecast</span>
                            </span>
                </p>
        } else {
            returnButton = null;
        }

        return (
            <div className="box box-border-blue">
                <div className="level">
                    <div className="level-left">
                        <div className="level-item">
                            <div>
                                <h2 className="is-size-5">Forecast</h2>
                                <h6 className="is-size-7">{this.computeDateHeader()}</h6>
                            </div>
                        </div>
                    </div>

                    <div className="level-right">
                        <div className="level-item">
                            <div className="select is-info is-rounded">
                                <select onChange={this.handleForecastIntervalChange} value={this.state.selectedForecastInterval}>
                                    <option value="Daily">Daily</option>
                                    <option value="Weekly">Weekly</option>
                                    <option value="Monthly">Monthly</option>
                                    <option value="Yearly">Yearly</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="card-hr"/>
                {returnButton}
                <table className={"table is-fullwidth is-striped " + (this.props.interval === 'MONTHLY' ? ' is-hoverable ' : '')}>
                    <thead>
                    <tr>
                        <th className="has-text-left is-size-6-half">Period</th>
                        <th className="has-text-centered is-size-6-half">Credits</th>
                        <th className="has-text-centered is-size-6-half">Earnings</th>
                        <th className="has-text-centered is-size-6-half">
                            <span className="icon-text">
                                <span>Net</span>
                                <span className="icon has-tooltip-link"
                                      data-tooltip={"Refers to net earnings. In this case net earnings is equal to Earnings + Credits"}>
                                    <BsQuestionCircleFill/>
                                </span>
                            </span>
                        </th>
                        <th className="has-text-centered is-size-6-half">Debits</th>
                        <th className="has-text-centered is-size-6-half">Balance</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.data.map((item, key) => {
                            return (
                                <tr key={key} className={item.active ? ' is-selected ' : ''} onClick={() => {
                                    this.setState({selectedForecastInterval: 'Daily'})
                                    this.props.rowClickHandler(item.startDate)
                                }}>
                                    <td className="has-text-left is-size-6-half">{this.computeDateDisplay(item.startDate, item.endDate)}</td>
                                    <td className="has-text-centered is-size-6-half">{formatNumberForDisplay(item.deposits)}</td>
                                    <td className="has-text-centered is-size-6-half">{formatNumberForDisplay(item.earnings)}</td>
                                    <td className="has-text-centered is-size-6-half">{formatNumberForDisplay(item.netEarnings)}</td>
                                    <td className="has-text-centered is-size-6-half">{formatNumberForDisplay(item.withdrawals)}</td>
                                    <td className="has-text-centered is-size-6-half">{formatNumberForDisplay(item.balance)}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                    <tfoot>
                    <tr>
                        <th className="has-text-left is-size-6-half">Totals</th>
                        <th className="has-text-centered is-size-6-half">{formatNumberForDisplay(this.props.totals.totalDeposits)}</th>
                        <th className="has-text-centered is-size-6-half">{formatNumberForDisplay(this.props.totals.totalEarnings)}</th>
                        <th className="has-text-centered is-size-6-half">{formatNumberForDisplay(this.props.totals.totalNetEarnings)}</th>
                        <th className="has-text-centered is-size-6-half">{formatNumberForDisplay(this.props.totals.totalWithdrawals)}</th>
                        <th className="has-text-centered is-size-6-half">{formatNumberForDisplay(this.props.totals.totalBalance)}</th>
                    </tr>
                    </tfoot>
                </table>
            </div>
        );
    }


    //  LIFECYCLE FUNCTIONS

    /*componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.interval !== this.props.interval) {
            this.setState({selectedForecastInterval: this.props.interval.charAt(0).toUpperCase() + this.props.interval.slice(1)})
        }
    }*/
}