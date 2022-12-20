import React, {Component} from "react";
import TradeLogTradeListEntry from "./TradeLogTradeListEntry";
import TradeLogTradeListPagination from "./TradeLogTradeListPagination";

export default class TradeLogTradeList extends Component {


    //  RENDER FUNCTION

    render() {
        return (
            <div className="trade-list">
                <div className="container">
                    <div className="table-container" style={{minHeight: "450px"}}>
                        <table className="table is-fullwidth is-striped hoverable-table">
                            <thead>
                            <tr>
                                <th className="has-text-left is-vcentered">Time</th>
                                <th className="has-text-centered is-vcentered">Type</th>
                                <th className="has-text-centered is-vcentered">Product</th>
                                <th className="has-text-centered is-vcentered">Size</th>
                                <th className="has-text-centered is-vcentered">P&L</th>
                                <th className="has-text-centered is-vcentered">Pips</th>
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
                                            tradeId={item.tradeId}
                                            netProfit={item.netProfit}
                                            pips={item.pips}
                                            selectedTrade={this.props.selectedTrade}
                                            key={key}
                                            selectTradeHandler={this.props.selectTradeHandler}
                                        />
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                    <div className={"disregard-container" + (this.props.selectedTrade !== 'none' ? '' : ' no-show ')}>
                        <button className="button is-primary" onClick={() => this.props.disregardHandler(this.props.selectedTrade)}>
                            Remove Trade
                        </button>
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