import { FC } from "react";
import { useRouteError } from "react-router-dom";

export const NotFound: FC = () => {
    // const error = useRouteError();
    // console.error(error);

    return (
        <div style={{ color: "black" }}>
            Page not found
            {/* <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p> */}
            {/* <p>
                <i>{error.statusText || error.message}</i>
            </p> */}
        </div>
    );
};
