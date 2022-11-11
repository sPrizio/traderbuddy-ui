import React, {Component} from "react";
import {AiFillDelete} from "react-icons/ai";
import TradeLogTradeListEntry from "./TradeLogTradeListEntry";
import TradeLogTradeListPagination from "./TradeLogTradeListPagination";

export default class TradeLogTradeList extends Component {


    //  RENDER FUNCTION

    render() {
        return (
            <div className="trade-list">
                <div className="container">
                    <div className="table-container" style={{minHeight: "450px"}}>
                        <table className="table is-fullwidth hoverable-table">
                            <thead>
                            <tr>
                                <th className="has-text-centered is-vcentered">Opened</th>
                                <th className="has-text-centered is-vcentered">Closed</th>
                                <th className="has-text-centered is-vcentered">Type</th>
                                <th className="has-text-centered is-vcentered">Product</th>
                                <th className="has-text-centered is-vcentered">Size</th>
                                <th className="has-text-centered is-vcentered">P&L</th>
                                {/*<th/>*/}
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.props.tradeData &&
                                this.props.tradeData.content &&
                                this.props.tradeData.content.map((item, key) => {
                                    return (
                                        <TradeLogTradeListEntry
                                            openTime={item.tradeOpenTime}
                                            closeTime={item.tradeCloseTime}
                                            tradeType={item.tradeType}
                                            symbol={item.product}
                                            size={item.lotSize}
                                            netProfit={item.netProfit}
                                            selectedTrade={this.props.selectedTrade}
                                            key={key}
                                            selectTradeHandler={this.props.selectTradeHandler}
                                            listId={key}
                                        />
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                    <TradeLogTradeListPagination
                        page={
                            this.props.tradeData &&
                            this.props.tradeData.pageable ?
                                this.props.tradeData.pageable.pageNumber
                                : 0
                        }
                        pageSize={
                            this.props.tradeData &&
                            this.props.tradeData.pageable ?
                            this.props.tradeData.pageable.pageSize
                                : 0
                        }
                        totalElements={this.props.tradeData.totalElements}
                        totalPages={this.props.tradeData.totalPages}
                        currentPage={this.props.tradeData.number}
                        pageHandler={this.props.pageHandler}
                    />
                </div>
            </div>
        );
    }
}