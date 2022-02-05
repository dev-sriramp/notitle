import React from "react";
import {StatusBar} from "native-base";
import {BG_STATUS_BAR} from "../util/constants";
const SBar = () =>{
    return(
<StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor={BG_STATUS_BAR}
        translucent={false}
        networkActivityIndicatorVisible={true}
      />
    )
}
export default SBar;