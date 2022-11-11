import React, {Component} from "react";

export default class TradeLogTradeListPagination extends Component {


    //  GENERAL FUNCTIONS

    computePageDisplayText() {
        const startBound = (this.props.page * this.props.pageSize) + 1
        const endBound = (this.props.page + 1) * this.props.pageSize

        if (endBound > this.props.totalElements) {
            return (
                <span className="sub-header">
                    Viewing {startBound} - {this.props.totalElements} of {this.props.totalElements} trades
                </span>
            )
        }

        return (
            <span className="sub-header">
                Viewing {startBound} - {endBound} of {this.props.totalElements} trades
            </span>
        )
    }


    //  RENDER FUNCTION

    render() {
        let pages = []
        for (let i = 0; i < this.props.totalPages; i++) {
            pages.push(
                <a className={"pagination-link" + (this.props.currentPage === i ? ' is-current ' : '')}
                   aria-label="Goto page 1"
                   onClick={() => this.props.pageHandler(i)}
                >
                    {i + 1}
                </a>
            )
        }

        return (
            <div className="columns is-multiline is-mobile is-vcentered">
                <div className="column is-6">
                    {this.computePageDisplayText()}
                </div>
                <div className="column is-6">
                    <div className="pagination is-right is-small" role="navigation" aria-label="pagination">
                        <ul className="pagination-list">
                            {
                                pages.map((item, key) => {
                                    return (
                                        <li key={key}>
                                            {item}
                                        </li>
                                    )
                                })
                            }
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