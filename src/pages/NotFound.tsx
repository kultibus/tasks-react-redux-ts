import { FC } from "react";
import { useRouteError } from "react-router-dom";
import { MainCnt } from "../components/main-cnt/MainCnt";

export const NotFound: FC = () => {
    // const error = useRouteError();
    // console.error(error);

    return (
        <MainCnt>
            <div style={{ color: "black" }}>
                <div style={{fontSize: '5rem', color: 'black'}}>Page not found</div>
                {/* <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p> */}
                {/* <p>
                <i>{error.statusText || error.message}</i>
            </p> */}
            </div>
        </MainCnt>
    );
};
