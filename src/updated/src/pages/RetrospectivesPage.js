import React, {Component} from "react";
import Retrospective from "../components/retrospective/Retrospective";

export default class RetrospectivesPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedInterval : 'WEEKLY'
        }

        this.selectTab = this.selectTab.bind(this)
    }


    //  HANDLER FUNCTIONS

    selectTab(val) {
        this.setState({selectedInterval: val})
    }


    //  RENDER FUNCTION

    render() {
        return (
            <div className="retrospectives-page">
                <div className="container">
                    <div className="tabs is-boxed is-centered">
                        <ul>
                            <li className={(this.state.selectedInterval === 'WEEKLY' ? ' is-active ' : '')}>
                                <a onClick={() => this.selectTab('WEEKLY')}>Weekly</a>
                            </li>
                            <li className={(this.state.selectedInterval === 'MONTHLY' ? ' is-active ' : '')}>
                                <a onClick={() => this.selectTab('MONTHLY')}>Monthly</a>
                            </li>
                        </ul>
                    </div>
                    <div className="columns is-multiline is-mobile is-vcentered">
                        <div className="column is-12">
                            <Retrospective showTotals={true} />
                        </div>
                        <div className="column is-12">
                            <Retrospective showTotals={true} />
                        </div>
                        <div className="column is-12">
                            <Retrospective showTotals={true} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}