import { FC, ReactNode, useEffect, useState } from "react";
import { AuthContext } from "./context";
import { useAppDispatch } from "./hooks/redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { setUser, setUserIsLoading } from "./store/slices/user-slice/userSlice";
import { IUser } from "./models/IUser";

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [isAuth, setIsAuth] = useState<boolean>(
        !!localStorage.getItem("auth")
    );

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setUserIsLoading(true));

        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                localStorage.setItem("auth", "true");

                setIsAuth(true);

                dispatch(
                    setUser({
                        uid: user.uid,
                        displayName: user.displayName,
                    })
                );
            } else {
                localStorage.removeItem("auth");

                setIsAuth(false);

                dispatch(setUser({} as IUser));

                dispatch(setUserIsLoading(false));
            }
        });

        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={isAuth}>{children}</AuthContext.Provider>
    );
};
