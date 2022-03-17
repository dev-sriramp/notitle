import React from "react";
import Lottie from 'react-lottie';
import animationData from '../../assets/loading.json';
import { ShimmerThumbnail, ShimmerTitle, ShimmerSectionHeader } from "react-shimmer-effects";
function loading() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };
    return (
        <><div className="continer-sm " style={{ width: "23rem" }}>
            <Lottie
                options={defaultOptions}
                height={300}
                width={300}
            />
        </div></>
    )
}
export default loading;
