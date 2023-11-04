import React from "react";
import StaticPage from "../components/StaticPage";
import MapComponent from "../components/MapComponent";

const HomePage: React.FunctionComponent = () => {

    return (
        <StaticPage>
            <MapComponent></MapComponent>
        </StaticPage>
    )
}

export default HomePage