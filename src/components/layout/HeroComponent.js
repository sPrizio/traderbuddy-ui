import React, {Component} from "react";

export default class HeroComponent extends Component {


    //  RENDER FUNCTION

    render() {
        return (
            <section className="hero">
                <div className="hero-body">
                    <div className="container">
                        <div className="columns is-multiline">
                            <div className="column is-8">
                                <p className="title">{this.props.title}</p>
                                <p className="subtitle">{this.props.subtitle}</p>
                            </div>
                            <div className="column is-4 has-text-right" />
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
