import { FC, useEffect } from "react";
import { useRouteError } from "react-router-dom";
import { AppLayout } from "./components/app-layout/AppLayout";
import { useAppDispatch } from "./hooks/redux";
import { IUser } from "./models/IUser";
import { authSlice } from "./store/slices/authSlice/authSlice";

// export const App: FC = () => {
//     const dispatch = useAppDispatch();

//     const { setAuth, setUser } = authSlice.actions;

//     useEffect(() => {
//         if (localStorage.getItem("auth")) {
//             dispatch(setAuth(true));
//             dispatch(
//                 setUser({
//                     displayName: localStorage.getItem("name" || ""),
//                     uid: localStorage.getItem("id"),
//                 } as IUser)
//             );
//         }
//     }, []);

//     return (
//         <AppCnt>
//             <Header />
//             <MainCnt>
//                 <Outlet />
//             </MainCnt>
//         </AppCnt>
//     );
// };

export const App: FC = () => {
    const dispatch = useAppDispatch();

    const { setAuth, setUser } = authSlice.actions;

    useEffect(() => {
        if (localStorage.getItem("auth")) {
            dispatch(setAuth(true));
            dispatch(
                setUser({
                    displayName: localStorage.getItem("name" || ""),
                    uid: localStorage.getItem("id"),
                } as IUser)
            );
        }
    }, []);

    const error = useRouteError();

    return <AppLayout error={error} />;
};
