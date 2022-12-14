import React, {Component} from "react";
import {TbTrendingDown, TbTrendingUp} from "react-icons/tb";
import {formatNumberForDisplay} from "../../service/FormattingService";
import AccountOverviewLoader from "../loader/account/AccountOverviewLoader";
import AccountOverviewRank from "./rank/AccountOverviewRank";

export default class AccountOverview extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
        }
    }


    //  GENERAL FUNCTIONS

    computeClass() {
        return this.props.overview.dailyEarnings >= 0 ? ' positive ' : ' negative '
    }


    //  RENDER FUNCTION

    render() {
        let loader = null
        if (this.state.isLoading) {
            loader = <AccountOverviewLoader isLoading={this.state.isLoading}/>
        }

        return (
            <div>
                <div className="card account-summary">
                    <div className="card-content">
                        {loader}
                        <div className={"" + (this.state.isLoading ? ' no-show ' : '')}>
                            <span className="title">Overview</span>
                            <div className="columns is-multiline is-mobile is-vcentered is-gapless">
                                <div className="column is-5">
                                    <div className="columns is-multiline is-mobile is-gapless">
                                        <div className="column is-12">
                                            <h4 className="balance">
                                                {formatNumberForDisplay(this.props.overview.balance)}
                                            </h4>
                                            <span className="icon-text net">
                                                <span className={"icon " + (this.computeClass())}>
                                                    {
                                                        this.props.overview.dailyEarnings >= 0 ?
                                                            <TbTrendingUp/> :
                                                            <TbTrendingDown />
                                                    }
                                                </span>
                                                <span className={this.computeClass()}>
                                                    {formatNumberForDisplay(this.props.overview.dailyEarnings)}
                                                </span>
                                            </span>
                                        </div>
                                        <div className="column is-12">
                                            <h4 className={"target" + (this.props.overview.nextTarget > 0 ? '' : ' no-show ')}>
                                                Next Target: {formatNumberForDisplay(this.props.overview.nextTarget)}
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="column is-7 has-text-centered">
                                    <AccountOverviewRank rank={this.props.overview.rank} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}