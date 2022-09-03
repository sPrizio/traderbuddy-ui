import React, {Component} from "react";
import {CgSoftwareUpload} from "react-icons/cg";

export default class FileImportComponent extends Component {

    static importTradesUrl = 'http://localhost:8080/api/v1/trades/import-trades'

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            file: null,
            fileInputKey: 1
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    //  HANDLER FUNCTIONS

    handleChange(event) {
        this.setState({file: event.target.files[0]})
    }

    async handleSubmit(event) {
        event.preventDefault()
        this.setState({fileInputKey: Math.random().toString(36)})
        if (this.state.file) {
            try {
                const formData = new FormData();
                formData.append('file', this.state.file);
                formData.append('fileName', this.state.file.name);
                await fetch(FileImportComponent.importTradesUrl + '?delimiter=,&tradePlatform=CMC_MARKETS', {method: 'POST', body: formData})
                this.setState({file: null}, () => window.location.reload(true))
            } catch (e) {
                console.log(e)
            }
        }
    }


    //  RENDER FUNCTION

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="file is-right is-info is-fullwidth">
                        <label className="file-label">
                            <input className="file-input" type="file" name="importTrades" onChange={this.handleChange}
                                   key={this.state.fileInputKey}/>
                            <span className="file-cta">
                            <span className="file-icon">
                                <CgSoftwareUpload/>
                            </span>
                            <span className="file-label">Select File</span>
                        </span>
                            <span className="file-name">
                                {this.state.file ? this.state.file.name : 'Choose a file...'}
                            </span>
                        </label>
                    </div>
                    <br />
                    <div className="field">
                        <p className="control">
                            <button type={"submit"} className="button is-info">Upload</button>
                        </p>
                    </div>
                </form>
            </div>
        );
    }
}
