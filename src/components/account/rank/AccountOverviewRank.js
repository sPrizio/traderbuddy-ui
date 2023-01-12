import React, {Component} from "react";
import {displayRankName, normalize} from "../../../service/FormattingService";

export default class AccountOverviewRank extends Component {

    
    //  RENDER FUNCTION
    
    render() {
        let previous = null
        if (this.props.rank.previousRank) {
            previous =
                <img
                    src={require(`../../../assets/images${this.props.rank.previousRank.imageUrl}`)}
                    alt={this.props.rank.previousRank.name + ' ' + this.props.rank.previousRank.level}
                    height={50}
                    width={50}
                />
        }

        let next = null
        if (this.props.rank.nextRank) {
            next =
                <img
                    src={require(`../../../assets/images${this.props.rank.nextRank.imageUrl}`)}
                    alt={this.props.rank.name + ' ' + this.props.rank.nextRank.level}
                    height={50}
                    width={50}
                />
        }

        return (
            <div className="columns is-multiline is-mobile is-gapless">
                <div className="column is-4">
                    {previous}
                </div>
                <div className="column is-4">
                    <img
                        src={require(`../../../assets/images${this.props.rank.imageUrl}`)}
                        alt={this.props.rank.name + ' ' + this.props.rank.level}
                        height={100}
                        width={100}
                    />
                </div>
                <div className="column is-4">
                    {next}
                </div>
                <div className="column is-12 has-text-right">
                    <div className="level">
                        <div className="level-left">
                            <div className="level-item">
                                <span className="sub-header">{this.props.rank.start}</span>
                            </div>
                        </div>
                        <div className="level-right">
                            <div className="level-item">
                                <span className="sub-header">{this.props.rank.end}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="column is-12">
                    <progress
                        className={"progress is-primary rank " + this.props.rank.className}
                        value={normalize(this.props.rank.start, this.props.rank.end, this.props.rank.current)}
                        max={100}
                    />
                </div>
                <div className="column is-12 has-text-right">
                    <div className="level">
                        <div className="level-left">
                            <div className="level-item">
                                <span className={"value " + this.props.rank.className}>
                                    {displayRankName(this.props.rank.name)}
                                </span>
                            </div>
                        </div>
                        <div className="level-right">
                            <div className="level-item">
                                <span className={"sub-header value has-text-weight-bold " + this.props.rank.className}>
                                    {this.props.rank.current}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}