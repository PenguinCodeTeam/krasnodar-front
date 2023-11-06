import React, {useRef} from "react";
import {Map, YMaps} from "@pbe/react-yandex-maps";

const RoutMapComponent: React.FunctionComponent = () => {
    const map: any = useRef(null);
    const mapState = {
        center: [55.739625, 37.5412],
        zoom: 12
    };

    const addRoute = (ymaps: any) => {
        const pointA = [55.749, 37.524];
        const pointB = "Москва, Красная площадь";
        const pointC = [55.749, 37.524];

        const multiRoute = new ymaps.multiRouter.MultiRoute(
            {
                referencePoints: [pointA, pointB, pointC],
                params: {
                    routingMode: "car"
                }
            },
            {
                boundsAutoApply: true
            }
        );

        map.current.geoObjects.add(multiRoute);
    };

    return (
        <div className="App">
            <YMaps query={{apikey: '4fb659a8-e693-42d7-a970-d0645bc69cdf'}}>
                <Map
                    modules={["multiRouter.MultiRoute"]}
                    state={mapState}
                    instanceRef={map}
                    onLoad={addRoute}
                ></Map>
            </YMaps>
        </div>
    );

}

export default RoutMapComponent
