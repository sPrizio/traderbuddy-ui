import React, {Component} from "react";
import {ThreeCircles} from "react-loader-spinner";
import {CoreConstants} from "../../../constants/coreConstants";

export default class TradeRecapCandleChartLoader extends Component {


    //  RENDER FUNCTION

    render() {
        return (
            <div className={"spinner-loader-container" + (!this.props.isLoading ? ' no-show ' : '')}>
                <div className="spinner">
                    <ThreeCircles
                        color={CoreConstants.CssConstants.PrimaryColor}
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel="three-circles-rotating"
                        outerCircleColor=""
                        innerCircleColor={CoreConstants.CssConstants.FontAccentColor}
                        middleCircleColor={CoreConstants.CssConstants.HeaderFontColor}
                    />
                </div>
            </div>
        );
    }
}