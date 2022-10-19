import React,{Component} from "react";
import {TbTrendingUp} from "react-icons/tb";
import {formatNumberForDisplay} from "../../service/FormattingService";
import {AiOutlineLineChart} from "react-icons/ai";

export default class AccountOverview extends Component {


    //  RENDER FUNCTION

    render() {
        return (
            <div>
                <div className="card account-summary">
                    <div className="card-content">
                        <span className="title">Overview</span>
                        <div className="columns is-multiline is-mobile is-vcentered is-gapless">
                            <div className="column is-6">
                                <h4 className="balance">${formatNumberForDisplay(3264.23)}</h4>
                                <span className="icon-text net">
                                    <span className="icon positive">
                                        <TbTrendingUp />
                                        {/*<TbTrendingDown />*/}
                                    </span>
                                    <span className="positive">${formatNumberForDisplay(2689.33)}</span>
                                </span>
                            </div>
                            <div className="column is-6 has-text-centered">
                                <button className="button is-primary">
                                    <span className="icon">
                                        <AiOutlineLineChart />
                                    </span>
                                    <span>Forecast</span>
                                </button>
                            </div>
                            <div className="column is-12">
                                <h4 className="target">Next Target: {formatNumberForDisplay(41.58)}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}