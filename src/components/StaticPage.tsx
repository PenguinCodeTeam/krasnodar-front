import React from "react";

const StaticPage: React.FunctionComponent = ({children}) => {
    return (
        <div className={"App"}>
            {children}
        </div>
    )
}

export default StaticPage