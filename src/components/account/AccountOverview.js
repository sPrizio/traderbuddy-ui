import React, {Component} from "react";
import {TbTrendingDown, TbTrendingUp} from "react-icons/tb";
import {formatNumberForDisplay} from "../../service/FormattingService";
import AccountOverviewLoader from "../loader/account/AccountOverviewLoader";
import {CoreConstants} from "../../constants/coreConstants";
import accountImage from '../../assets/images/458.jpg';

export default class AccountOverview extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            overview: {}
        }
    }


    //  GENERAL FUNCTIONS

    computeClass() {
        return this.state.overview.dailyEarnings >= 0 ? ' positive ' : ' negative '
    }

    async getAccountOverview() {
        try {
            this.setState({isLoading: true})
            const response = await fetch(
                CoreConstants.ApiUrls.Account.Overview
            )

            const data = await response.json()
            if (data.data) {
                this.setState({
                    overview: data.data,
                })
            }
        } catch (e) {
            console.log(e)
        }

        this.setState({
            isLoading: false,
        })
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
                            <span className="title">Account Overview</span>
                            <div className="columns is-multiline is-mobile is-vcentered is-gapless">
                                <div className="column is-6">
                                    <div className="columns is-multiline is-mobile is-gapless">
                                        <div className="column is-12">
                                            <h4 className="balance">
                                                {formatNumberForDisplay(this.state.overview.balance)}
                                            </h4>
                                            <span className="icon-text net">
                                                <span className={"icon " + (this.computeClass())}>
                                                    {
                                                        this.state.overview.dailyEarnings >= 0 ?
                                                            <TbTrendingUp/> :
                                                            <TbTrendingDown />
                                                    }
                                                </span>
                                                <span className={this.computeClass()}>
                                                    {formatNumberForDisplay(this.state.overview.dailyEarnings)}
                                                </span>
                                            </span>
                                        </div>
                                        <div className="column is-12">
                                            <h4 className={"target" + (this.state.overview.nextTarget > 0 ? '' : ' no-show ')}>
                                                Next Target: {formatNumberForDisplay(this.state.overview.nextTarget)}
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="column is-6 has-text-centered">
                                    <img src={accountImage} alt={'fun cartoon'} height={115} width={115} />
                                    {/*<a href="http://www.freepik.com">Designed by iconicbestiary / Freepik</a>*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


    //  LIFECYCLE FUNCTIONS

    async componentDidMount() {
        await this.getAccountOverview()
    }
}