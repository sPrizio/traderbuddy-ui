import React, {Component} from "react";
import {AiFillRightCircle} from "react-icons/ai";
import {RiAlarmWarningLine} from "react-icons/ri";
import {formatNumberForDisplay} from "../service/FormattingService";

export default class Retrospective extends Component {


    //  RENDER FUNCTION

    render() {
        let totals = null
        if (this.props.showTotals) {
            totals =
                <div>
                    <hr />
                    <div className="level is-mobile">
                        <div className="level-item has-text-centered">
                            <div>
                                <p className="sub-header">Trades</p>
                                <p className="value">60</p>
                            </div>
                        </div>
                        <div className="level-item has-text-centered">
                            <div>
                                <p className="sub-header">Trading Rate</p>
                                <p className="value">{formatNumberForDisplay(12.00)}</p>
                            </div>
                        </div>
                        <div className="level-item has-text-centered">
                            <div>
                                <p className="sub-header">Win %</p>
                                <p className="value">60</p>
                            </div>
                        </div>
                        <div className="level-item has-text-centered">
                            <div>
                                <p className="sub-header">Net Profit</p>
                                <p className="value">${formatNumberForDisplay(222.23)}</p>
                            </div>
                        </div>
                        <div className="level-item has-text-centered">
                            <div>
                                <p className="sub-header">Average Gain</p>
                                <p className="value">{formatNumberForDisplay(1.59)}%</p>
                            </div>
                        </div>
                    </div>
                </div>
        }

        return (
            <div className="retrospective">
                <div className="card">
                    <div className="card-content">
                        <h5 className="header">Retrospective</h5>
                        <h6 className="sub-header">October 10th - 16th</h6>
                        <div className="container">
                            <div className="block">
                                <div className="message is-primary">
                                    <div className="message-body">
                                        <p>
                                            <span className="icon-text">
                                                <span className="icon">
                                                    <RiAlarmWarningLine/>
                                                </span>
                                            </span>
                                            Go live was a good start. I need to focus on strategy, rules and small
                                            position sizes.
                                        </p>
                                        <p>
                                            <span className="icon-text">
                                                <span className="icon">
                                                    <RiAlarmWarningLine/>
                                                </span>
                                            </span>
                                            Avoid max position size scalping
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="block">
                                <span className="icon-text">
                                    <span className="icon">
                                        <AiFillRightCircle/>
                                    </span>
                                </span>
                                This was go live week! Had some good trading days, was a little nervous but overall I
                                performed very well. Small position sizes was a great call
                            </div>
                            <div className="block">
                                <span className="icon-text">
                                    <span className="icon">
                                        <AiFillRightCircle/>
                                    </span>
                                </span>
                                I need to focus on following my regular strategy and not leaning too heavily on things
                                I'm not used to like RSI. I should use it to support my ideas and not rely on it
                            </div>
                            <div className="block">
                                <span className="icon-text">
                                    <span className="icon">
                                        <AiFillRightCircle/>
                                    </span>
                                </span>
                                Friday was a dangerous trading day since I was scalping at max position size. While it
                                was easier to make money, it could have easily backfired on me. I should focus on fewer
                                trades, smaller position sizes and better entries
                            </div>
                            <div className="block">
                                <span className="icon-text">
                                    <span className="icon">
                                        <AiFillRightCircle/>
                                    </span>
                                </span>
                                Got a little greedy now that I'm using real money. I should avoid trading once my target
                                is hit because I can very easily give those profits back
                            </div>
                            {totals}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}