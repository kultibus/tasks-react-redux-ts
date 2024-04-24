import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAppSelector } from "./redux";
import { useState } from "react";
import { auth } from "../firebase";

// export function useAuth() {
//     const { user } = useAppSelector(state => state.authReducer);

//     return { isAuth: !!user.token, ...user };
// }

export function useAuth() {
    const [appAuth, setAppAuth] = useState<boolean>(false);
    // const auth = getAuth();

    onAuthStateChanged(auth, user => {
        if (user) setAppAuth(true);
        else setAppAuth(false);
    });

    return appAuth;
}
