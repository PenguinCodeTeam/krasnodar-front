import React from "react";
import {Placemark, Map, YMaps} from "@pbe/react-yandex-maps";

const MapComponent: React.FunctionComponent<any> = ({point}) => {
    const defaultState = {
        center: [55.751574, 37.573856],
        zoom: 5,
    };
    return (
        <YMaps query={{apikey: '4fb659a8-e693-42d7-a970-d0645bc69cdf'}}>
            <Map defaultState={defaultState} style={{width: '100%', height: '100%'}}>
                <Placemark geometry={point} />
            </Map>
        </YMaps>
    )

}

export default MapComponent
