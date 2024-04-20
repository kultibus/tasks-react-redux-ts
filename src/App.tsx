import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { fetchUsers } from "./store/reducers/ActionCreators";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import { Layout } from "./components/layout/Layout";

export const App: FC = () => {
    // const dispatch = useAppDispatch();

    // const { users, isLoading, error } = useAppSelector(
    //     state => state.userReducer
    // );

    // useEffect(() => {
    //     dispatch(fetchUsers());
    // }, []);

    return (
        <div>
            <RouterProvider router={router} />
        </div>
    );
};
