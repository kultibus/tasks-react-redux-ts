import { auth } from "../firebase";
import { useEffect, useCallback } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
    setUser,
    setUserIsLoading,
} from "../store/slices/user-slice/userSlice";
import { useAppDispatch } from "./redux";

export const useCheckAuth = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setUserIsLoading(true));

        const unsubscribe = onAuthStateChanged(auth, user => {
            if (!!user) {
                const { uid, displayName } = user;

                dispatch(setUser({ uid, displayName }));
            } else {
                dispatch(setUser(null));
            }
        });

        return () => {
            unsubscribe();
        };
    }, [dispatch]);
};
