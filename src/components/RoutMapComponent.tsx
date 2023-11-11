import React, {useRef} from "react";
import {Map, YMaps} from "@pbe/react-yandex-maps";

const RoutMapComponent: React.FunctionComponent<any> = ({data}) => {
    const map: any = useRef(null);
    const mapState = {
        center: [45.035765, 38.975605],
        zoom: 12,
    };
    const addresses = data?.map((el:any)=>el.point.full_address)

    const addRoute = (ymaps: any) => {
        const multiRoute = new ymaps.multiRouter.MultiRoute(
            {
                referencePoints: addresses,
                params: {
                    routingMode: "car"
                }
            },
            {
                boundsAutoApply: true,
            }
        );

        map.current.geoObjects.add(multiRoute);
    };

    return (
            <YMaps query={{apikey: '4fb659a8-e693-42d7-a970-d0645bc69cdf'}}>
                <Map
                    style={{width: '100%', height: '100%'}}
                    modules={["multiRouter.MultiRoute"]}
                    state={mapState}
                    instanceRef={map}
                    onLoad={addRoute}
                ></Map>
            </YMaps>
    );

}

export default RoutMapComponent
