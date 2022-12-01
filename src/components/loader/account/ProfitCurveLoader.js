import React, {Component} from "react";
import LoaderHeader from "../LoaderHeader";
import LoaderBody from "../LoaderBody";

export default class ProfitCurveLoader extends Component {


    //  RENDER FUNCTION

    render() {
        return (
            <div className={"loader-container" + (!this.props.isLoading ? ' no-show ' : '')}>
                <div className="columns is-multiline is-vcentered is-mobile">
                    <div className="column is-6">
                        <LoaderHeader count={1}/>
                    </div>
                    <div className="column is-12">
                        <LoaderBody count={5} />
                    </div>
                </div>
            </div>
        );
    }
}