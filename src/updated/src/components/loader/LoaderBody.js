import React, {Component} from "react";
import {CoreConstants} from "../../constants/coreConstants";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";

export default class LoaderBody extends Component {


    //  RENDER FUNCTION

    render() {
        return (
            <div>
                <SkeletonTheme
                    height={CoreConstants.SkeletonConstants.Height}
                    duration={CoreConstants.SkeletonConstants.Duration}
                    baseColor={CoreConstants.SkeletonConstants.BaseColor}
                    highlightColor={CoreConstants.SkeletonConstants.AccentColor}
                >
                    <Skeleton
                        count={this.props.count}
                        circle={false}
                    />
                </SkeletonTheme>
            </div>
        );
    }
}