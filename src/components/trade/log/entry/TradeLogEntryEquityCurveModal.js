import React, {Component} from "react";

export default class TradeLogEntryEquityCurveModal extends Component {


    //  RENDER FUNCTION

    render() {
        return (
            <div className={"modal " + (this.props.modalActive ? ' is-active' : '')}>
                <div className="modal-background"></div>
                <div className="modal-card" style={{minWidth: "900px"}}>
                    <header className="modal-card-head">
                        <p className="modal-card-title">Daily Equity Curve</p>
                        <button className="delete" aria-label="close"
                                onClick={() => this.props.toggleModal(this.props.modalActive)}></button>
                    </header>
                    <section className="modal-card-body">
                        {this.props.children}
                    </section>
                </div>
            </div>
        );
    }
}