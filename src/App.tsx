import { FC } from "react";
import { useRouteError } from "react-router-dom";
import { AppLayout } from "./components/app-layout/AppLayout";

export const App: FC = () => {
    const error = useRouteError();

    return <AppLayout error={error} />;
};
