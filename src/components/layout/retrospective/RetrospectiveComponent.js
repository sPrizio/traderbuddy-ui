import React, {Component} from "react";

export default class RetrospectiveComponent extends Component {


    //  RENDER FUNCTION

    render() {
        return (
            <div className="box box-border-blue">
                <div className="level">
                    <div className="level-left">
                        <div className="level-item">
                            <div>
                                <h2 className="is-size-5">Weekly Retrospective</h2>
                                <h6 className="is-size-7">September 12th - 18th</h6>
                            </div>
                        </div>
                    </div>

                    <div className="level-right"/>
                </div>
                <hr className="card-hr"/>
                <div className="content">
                    <blockquote>
                        This would contain any key notes or important takeaways from the time period.<br/>
                        Each new element would probably be separated into individual lines?<br/>
                        br tags look nicer than p tags since the spacing isn't as excessive
                    </blockquote>
                    <ul className="retro-list">
                        <li>This is the first point</li>
                        <li>This is the second point</li>
                        <li>
                            This is the third point that is going to represent a large amount of text, ideally a nice description of both good and bad takeaways from the period of trading. These points should be used
                            as areas of improvement and small forms of praise.
                        </li>
                    </ul>
                </div>
                <hr className="card-hr"/>
                <div className="level">
                    <div className="level-item has-text-centered">
                        <div>
                            <p className="heading">Total Trades</p>
                            <p className="subtitle">54</p>
                        </div>
                    </div>
                    <div className="level-item has-text-centered">
                        <div>
                            <p className="heading">Trading Rate</p>
                            <p className="subtitle">10.58</p>
                        </div>
                    </div>
                    <div className="level-item has-text-centered">
                        <div>
                            <p className="heading">Win%</p>
                            <p className="subtitle">58</p>
                        </div>
                    </div>
                    <div className="level-item has-text-centered">
                        <div>
                            <p className="heading">Net Profit</p>
                            <p className="subtitle">108.65</p>
                        </div>
                    </div>
                    <div className="level-item has-text-centered">
                        <div>
                            <p className="heading">Average Gain</p>
                            <p className="subtitle">1.55%</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}