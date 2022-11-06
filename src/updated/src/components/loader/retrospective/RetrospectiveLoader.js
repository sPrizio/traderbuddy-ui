import React, {Component} from "react";
import LoaderBody from "../LoaderBody";
import LoaderHeader from "../LoaderHeader";

export default class RetrospectiveLoader extends Component {


    //  RENDER FUNCTIONS

    render() {
        return (
            <div className={"loader-container" + (!this.props.isLoading ? ' no-show ' : '')}>
                <div className="columns is-multiline is-vcentered is-mobile">
                    <div className="column is-6">
                        <LoaderHeader count={1}/>
                    </div>
                    <div className="column is-12">
                        <hr className="navbar-divider"/>
                    </div>
                    <div className="column is-12">
                        <LoaderBody count={5} />
                    </div>
                </div>
            </div>
        );
    }
}