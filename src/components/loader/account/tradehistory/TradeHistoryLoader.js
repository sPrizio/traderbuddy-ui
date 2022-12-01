import React, {Component} from "react";
import LoaderHeader from "../../LoaderHeader";
import LoaderBody from "../../LoaderBody";

export default class TradeHistoryLoader extends Component {


    //  RENDER FUNCTION

    render() {
        const skeletonLines = []
        const skeletonLine = <LoaderBody count={1} />

        for (let i = 0; i < this.props.count; i++) {
            skeletonLines.push(skeletonLine)
        }

        return (
            <div className={"loader-container" + (!this.props.isLoading ? ' no-show ' : '')}>
                <div className="columns is-multiline is-vcentered is-mobile">
                    <div className="column is-6">
                        <LoaderHeader count={1} />
                    </div>
                    <div className="column is-12">
                        <hr className="navbar-divider"/>
                    </div>
                    {
                        skeletonLines.map((item, key) => {
                            return (
                                <div className="column is-12" key={key}>
                                    {item}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}