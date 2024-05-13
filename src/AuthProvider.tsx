import { FC, ReactNode, useEffect, useState } from "react";
import { AuthContext } from "./context";
import { useAppDispatch } from "./hooks/redux";
import { checkUserAuth } from "./store/slices/user-slice/userActionCreators";
import { checkProjects } from "./store/slices/projects-slice/projectsActionCreators";

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [isAuth, setIsAuth] = useState<boolean>(
        !!localStorage.getItem("auth")
    );

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(checkUserAuth(setIsAuth));
    }, []);

    return (
        <AuthContext.Provider value={{ isAuth }}>
            {children}
        </AuthContext.Provider>
    );
};
