import React, {Component} from "react";
import FileImport from "./FileImport";

export default class FileImportModal extends Component {


    //  RENDER FUNCTION

    render() {
        return (
            <div className={"modal" + (this.props.active ? ' is-active ' : '')}>
                <div className="modal-background" />
                <FileImport closeHandler={this.props.closeHandler} />
            </div>
        );
    }
}