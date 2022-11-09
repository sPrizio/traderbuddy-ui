import React, {Component} from "react";
import {formatNumberForDisplay} from "../../../../service/FormattingService";
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
                                <th className="has-text-centered is-vcentered">Security</th>
                                <th className="has-text-centered is-vcentered">Size</th>
                                <th className="has-text-centered is-vcentered">P&L</th>
                                {/*<th/>*/}
                            </tr>
                            </thead>
                            <tbody>
                            <TradeLogTradeListEntry
                                openTime={'9:37'} closeTime={'9:41'}
                                tradeType={'Buy'} symbol={'Nasdaq 100 Cash'}
                                size={1.2} netProfit={40.30}
                                active={false}
                            />
                            <TradeLogTradeListEntry
                                openTime={'9:42'} closeTime={'9:43'}
                                tradeType={'Sell'} symbol={'Nasdaq 100 Cash'}
                                size={2} netProfit={4.63}
                                active={false}
                            />
                            <TradeLogTradeListEntry
                                openTime={'9:58'} closeTime={'10:04'}
                                tradeType={'Sell'} symbol={'Nasdaq 100 Cash'}
                                size={2} netProfit={1.99}
                                active={true}
                            />
                            <TradeLogTradeListEntry
                                openTime={'10:04'} closeTime={'10:04'}
                                tradeType={'Sell'} symbol={'Nasdaq 100 Cash'}
                                size={0.8} netProfit={-12.35}
                                active={false}
                            />
                            <TradeLogTradeListEntry
                                openTime={'10:11'} closeTime={'10:13'}
                                tradeType={'Buy'} symbol={'Nasdaq 100 Cash'}
                                size={0.8} netProfit={16.40}
                                active={false}
                            />
                            <TradeLogTradeListEntry
                                openTime={'10:48'} closeTime={'10:56'}
                                tradeType={'Buy'} symbol={'Nasdaq 100 Cash'}
                                size={1.7} netProfit={8}
                                active={false}
                            />
                            <TradeLogTradeListEntry
                                openTime={'10:48'} closeTime={'10:56'}
                                tradeType={'Buy'} symbol={'Nasdaq 100 Cash'}
                                size={1.7} netProfit={8}
                                active={false}
                            />
                            <TradeLogTradeListEntry
                                openTime={'10:48'} closeTime={'10:56'}
                                tradeType={'Buy'} symbol={'Nasdaq 100 Cash'}
                                size={1.7} netProfit={8}
                                active={false}
                            />
                            <TradeLogTradeListEntry
                                openTime={'10:48'} closeTime={'10:56'}
                                tradeType={'Buy'} symbol={'Nasdaq 100 Cash'}
                                size={1.7} netProfit={8}
                                active={false}
                            />
                            <TradeLogTradeListEntry
                                openTime={'10:48'} closeTime={'10:56'}
                                tradeType={'Buy'} symbol={'Nasdaq 100 Cash'}
                                size={1.7} netProfit={8}
                                active={false}
                            />
                            </tbody>
                        </table>
                    </div>
                    <TradeLogTradeListPagination />
                </div>
            </div>
        );
    }
}