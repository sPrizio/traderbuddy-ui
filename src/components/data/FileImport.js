import React, {Component} from "react";
import {CgSoftwareUpload} from "react-icons/cg";
import {CoreConstants} from "../../constants/coreConstants";

export default class FileImport extends Component {

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
                await fetch(
                    CoreConstants.ApiUrls.Trade.Upload.replace('{delimiter}', ',').replace('{tradePlatform}', 'CMC_MARKETS'),
                    {
                        method: 'POST',
                        body: formData
                    }
                )
                this.setState({file: null}, () => window.location.reload(true))
            } catch (e) {
                console.log(e)
            }
        }
    }


    //  RENDER FUNCTION

    render() {
        return (
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Upload Trades</p>
                    <button className="delete" aria-label="close" onClick={this.props.closeHandler} />
                </header>
                <form onSubmit={this.handleSubmit}>
                    <section className="modal-card-body">
                        <p>Keep track of your trades by uploading a .csv file of your trades!</p>
                        <br />
                        <div className="file is-right is-info is-fullwidth">
                            <label className="file-label">
                                <input className="file-input" type="file" name="importTrades"
                                       onChange={this.handleChange}
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
                        <p>
                            Don't worry about uploading files with duplicate trades, we'll
                            take care of handling duplicates.
                        </p>
                    </section>
                    <footer className="modal-card-foot has-text-right">
                        <button className="button is-primary" type={"submit"}>Upload</button>
                        <button className="button" onClick={this.props.closeHandler}>Cancel</button>
                    </footer>
                </form>
            </div>
        );
    }
}
