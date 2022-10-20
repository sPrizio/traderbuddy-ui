import React, {Component} from "react";
import {AiFillDelete} from "react-icons/ai";
import {formatNumberForDisplay} from "../../../service/FormattingService";

export default class TradeList extends Component {


    //  RENDER FUNCTION

    render() {
        return (
            <div className="trade-list">
                <div className="card">
                    <div className="card-content">
                        <h5 className="header">Trades List</h5>
                        <h6 className="sub-header">October 17th</h6>
                        <div className="container">
                            <div className="table-container">
                                <table className="table is-fullwidth">
                                    <thead>
                                    <tr>
                                        <th className="has-text-centered is-vcentered">Opened</th>
                                        <th className="has-text-centered is-vcentered">Closed</th>
                                        <th className="has-text-centered is-vcentered">Type</th>
                                        <th className="has-text-centered is-vcentered">Security</th>
                                        <th className="has-text-centered is-vcentered">Size</th>
                                        <th className="has-text-centered is-vcentered">P&L</th>
                                        <th />
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td className="has-text-centered is-vcentered">9:37</td>
                                        <td className="has-text-centered is-vcentered">9:41</td>
                                        <td className="has-text-centered is-vcentered">Buy</td>
                                        <td className="has-text-centered is-vcentered">Nasdaq 100 Cash</td>
                                        <td className="has-text-centered is-vcentered">1.2&nbsp;pts</td>
                                        <td className="has-text-centered is-vcentered">{formatNumberForDisplay(40.30)}</td>
                                        <td className="has-text-centered is-vcentered">
                                            <button className="button">
                                                <AiFillDelete />
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="has-text-centered is-vcentered">9:42</td>
                                        <td className="has-text-centered is-vcentered">9:43</td>
                                        <td className="has-text-centered is-vcentered">Sell</td>
                                        <td className="has-text-centered is-vcentered">Nasdaq 100 Cash</td>
                                        <td className="has-text-centered is-vcentered">2&nbsp;pts</td>
                                        <td className="has-text-centered is-vcentered">{formatNumberForDisplay(4.63)}</td>
                                        <td className="has-text-centered is-vcentered">
                                            <button className="button">
                                                <AiFillDelete />
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="has-text-centered is-vcentered">9:58</td>
                                        <td className="has-text-centered is-vcentered">10:04</td>
                                        <td className="has-text-centered is-vcentered">Sell</td>
                                        <td className="has-text-centered is-vcentered">Nasdaq 100 Cash</td>
                                        <td className="has-text-centered is-vcentered">2&nbsp;pts</td>
                                        <td className="has-text-centered is-vcentered">{formatNumberForDisplay(1.99)}</td>
                                        <td className="has-text-centered is-vcentered">
                                            <button className="button">
                                                <AiFillDelete />
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="has-text-centered is-vcentered">10:04</td>
                                        <td className="has-text-centered is-vcentered">10:04</td>
                                        <td className="has-text-centered is-vcentered">Sell</td>
                                        <td className="has-text-centered is-vcentered">Nasdaq 100 Cash</td>
                                        <td className="has-text-centered is-vcentered">0.8&nbsp;pts</td>
                                        <td className="has-text-centered is-vcentered">{formatNumberForDisplay(-12.35)}</td>
                                        <td className="has-text-centered is-vcentered">
                                            <button className="button">
                                                <AiFillDelete />
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="has-text-centered is-vcentered">10:11</td>
                                        <td className="has-text-centered is-vcentered">10:13</td>
                                        <td className="has-text-centered is-vcentered">Buy</td>
                                        <td className="has-text-centered is-vcentered">Nasdaq 100 Cash</td>
                                        <td className="has-text-centered is-vcentered">0.8&nbsp;pts</td>
                                        <td className="has-text-centered is-vcentered">{formatNumberForDisplay(16.40)}</td>
                                        <td className="has-text-centered is-vcentered">
                                            <button className="button">
                                                <AiFillDelete />
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="has-text-centered is-vcentered">10:48</td>
                                        <td className="has-text-centered is-vcentered">10:56</td>
                                        <td className="has-text-centered is-vcentered">Buy</td>
                                        <td className="has-text-centered is-vcentered">Nasdaq 100 Cash</td>
                                        <td className="has-text-centered is-vcentered">1.7&nbsp;pts</td>
                                        <td className="has-text-centered is-vcentered">{formatNumberForDisplay(8)}</td>
                                        <td className="has-text-centered is-vcentered">
                                            <button className="button">
                                                <AiFillDelete />
                                            </button>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="columns is-multiline is-mobile is-vcentered">
                                <div className="column is-6">
                                    <span className="sub-header">Viewing 1-6 of 30 trades</span>
                                </div>
                                <div className="column is-6">
                                    <div className="pagination is-right is-small" role="navigation" aria-label="pagination">
                                        <ul className="pagination-list">
                                            <li>
                                                <a className="pagination-link" aria-label="Goto page 1">1</a>
                                            </li>
                                            <li>
                                                <a className="pagination-link" aria-label="Goto page 2">2</a>
                                            </li>
                                            <li>
                                                <a className="pagination-link is-current" aria-label="Page 3" aria-current="page">3</a>
                                            </li>
                                            <li>
                                                <a className="pagination-link" aria-label="Goto page 4">4</a>
                                            </li>
                                            <li>
                                                <span className="pagination-ellipsis">&hellip;</span>
                                            </li>
                                            <li>
                                                <a className="pagination-link" aria-label="Goto page 7">7</a>
                                            </li>
                                        </ul>
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