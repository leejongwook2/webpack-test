import imageIsland from '../assets/pexels-s-migaj-1529662.jpg'
import {createElement} from "react";

const ImageIsland = () => {

    return createElement({
        src: imageIsland,
        alt: '인터넷에서 다운 받은 그림'
    })

};

export default ImageIsland;