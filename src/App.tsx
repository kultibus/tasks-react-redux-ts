import { FC, createContext } from "react";
import { useRouteError } from "react-router-dom";
import { AppLayout } from "./components/app-layout/AppLayout";

export const AuthContext = createContext(false);

export const App: FC = () => {
    const error = useRouteError();

    return (
        <AuthContext.Provider value={false}>
            <AppLayout error={error} />
        </AuthContext.Provider>
    );
};
