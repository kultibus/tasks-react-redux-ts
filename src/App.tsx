import { FC, useEffect } from "react";
import { useRouteError } from "react-router-dom";
import { AppLayout } from "./components/app-layout/AppLayout";
import { useAppDispatch } from "./hooks/redux";
import { checkUserAuth } from "./store/slices/user-slice/userActionCreators";

// export const App: FC = () => {
//     const error = useRouteError();

//     const dispatch = useAppDispatch();

//     useEffect(() => {
//         dispatch(checkUserAuth());
//     }, []);

//     return <AppLayout error={error} />;
// };

export const App: FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(checkUserAuth());
    }, []);

    return <AppLayout />;
};
