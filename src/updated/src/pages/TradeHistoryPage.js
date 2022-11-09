import React, {Component} from "react";
import {AiOutlineArrowLeft} from "react-icons/ai";
import TradeLogEntry from "../components/trade/log/entry/TradeLogEntry";
import {CoreConstants} from "../constants/coreConstants";
import moment from "moment";

export default class TradeHistoryPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            start: moment().startOf('month').format('YYYY-MM-DD'),
            end: moment().add(1, 'months').startOf('month').format('YYYY-MM-DD'),
            interval: 'DAILY',
            trades: []
        };
    }


    //  GENERAL FUNCTIONS

    async getTradeLog() {
        try {
            this.setState({isLoading: true})
            const response = await fetch(
                CoreConstants.ApiUrls.TradeHistory
                    .replace('{start}', this.state.start)
                    .replace('{end}', this.state.end)
                    .replace('{aggregateInterval}', this.state.interval)
                    .replace('{sortOrder}', 'desc')
            )

            const data = await response.json()
            this.setState({
                trades: data.data
            })
        } catch (e) {
            console.log(e)
        }

        this.setState({
            isLoading: false,
        })
    }


    //  RENDER FUNCTION

    render() {
        return (
            <div className="trade-history">
                <div className="level">
                    <div className="level-left">
                        <div className="level-item">
                            <button className="button">
                                        <span className="icon">
                                            <AiOutlineArrowLeft/>
                                        </span>
                                <span>2022</span>
                            </button>
                        </div>
                    </div>
                    <div className="level-right">
                        <div className="level-item">
                            <div className="select">
                                <select>
                                    <option disabled={true}>January</option>
                                    <option disabled={true}>February</option>
                                    <option disabled={true}>March</option>
                                    <option disabled={true}>April</option>
                                    <option disabled={true}>May</option>
                                    <option disabled={true}>June</option>
                                    <option disabled={true}>July</option>
                                    <option>August</option>
                                    <option>September</option>
                                    <option>October</option>
                                    <option selected={true}>November</option>
                                    <option disabled={true}>December</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"columns is-multiline is-mobile"}>
                    {
                        this.state.trades.map((item, key) => {
                            return (
                                <div className="column is-12" key={key}>
                                    <TradeLogEntry tradeRecord={item} index={key} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        );
    }


    //  LIFECYCLE FUNCTIONS

    async componentDidMount() {
        await this.getTradeLog()
    }
}