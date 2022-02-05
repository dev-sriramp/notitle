import React from "react";
import { Image, Center } from "native-base";
import icon from "../util/logo.jpg";
const ImageIcon = () => {
    return (
        <Center>
            <Image
                width={250}
                height={250}
                resizeMode="center"
                source={icon}
                alt="Alternate Text"
            /></Center>
    )
};
export default ImageIcon;