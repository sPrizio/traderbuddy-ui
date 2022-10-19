import React, {Component} from "react";
import {getDomain} from "../../../services/ConfigurationService";
import moment from "moment/moment";
import {TbTrendingUp} from "react-icons/tb";

export default class BalanceComponent extends Component {

    static fetchBalanceUrl = getDomain() + '/balance/current'

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            startDate: moment().startOf('month'),
            balance: {}
        }
    }


    //  GENERAL FUNCTIONS

    async getBalance() {
        try {
            this.setState({isLoading: true})
            const response = await fetch(BalanceComponent.fetchBalanceUrl)
            const data = await response.json()

            this.setState({
                isLoading: false,
                performanceSummary: data.data,
                balance: data.data,
            })
        } catch (e) {
            this.setState({isLoading: false})
            console.log(e)
        }
    }


    //  RENDER FUNCTION

    render() {
        return (
            <div className="box box-border-yellow">
                <div className="columns is-multiline is-mobile">
                    <div className="column is-6">
                        <h2 className="is-size-5 is-vcentered">Account</h2>
                        <h6 className="is-size-6-half">Year to Date</h6>
                    </div>
                    <div className="column is-6 has-text-right">
                        <p className="is-size-4">3689.33</p>
                        <span className="icon-text positive-profit has-text-weight-semibold">
                            <span className="icon">
                                <TbTrendingUp />
                                {/*<TbTrendingDown />*/}
                            </span>
                            <span>2689.33</span>
                        </span>
                        <p className="is-size-6-half">Next Target: 41.26</p>
                    </div>
                </div>
            </div>
        );
    }


    //  LIFECYCLE FUNCTIONS

    async componentDidMount() {
        await this.getBalance()
    }
}