import React from "react";
import StaticPage from "../components/StaticPage";
import ViewTasks from "../components/ViewTasks";

const HomePage: React.FunctionComponent = () => {
    return (
        <StaticPage>
            <ViewTasks></ViewTasks>
        </StaticPage>
    )
}

export default HomePage