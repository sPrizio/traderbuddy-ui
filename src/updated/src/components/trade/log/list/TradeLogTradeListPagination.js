import React, {Component} from "react";

export default class TradeLogTradeListPagination extends Component {


    //  RENDER FUNCTION

    render() {
        return (
            <div className="columns is-multiline is-mobile is-vcentered">
                <div className="column is-6">
                    <span className="sub-header">Viewing 1 - 10 of 30 trades</span>
                </div>
                <div className="column is-6">
                    <div className="pagination is-right is-small" role="navigation" aria-label="pagination">
                        <ul className="pagination-list">
                            <li>
                                <a className="pagination-link is-current" aria-label="Goto page 1">1</a>
                            </li>
                            <li>
                                <a className="pagination-link" aria-label="Goto page 2">2</a>
                            </li>
                            <li>
                                <a className="pagination-link" aria-label="Page 3" aria-current="page">3</a>
                            </li>
                            {/*<li>
                                <span className="pagination-ellipsis">&hellip;</span>
                            </li>*/}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}