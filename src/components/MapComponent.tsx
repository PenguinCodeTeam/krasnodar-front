import React from "react";
import {Placemark, Map, YMaps} from "@pbe/react-yandex-maps";

const MapComponent: React.FunctionComponent = () => {
    const defaultState = {
        center: [55.751574, 37.573856],
        zoom: 5,
    };
    return (
        <YMaps>
            <Map defaultState={defaultState}>
                <Placemark geometry={[55.684758, 37.738521]} />
            </Map>
        </YMaps>
    )

}

export default MapComponent