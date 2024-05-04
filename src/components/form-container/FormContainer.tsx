import { FC, ReactNode, useContext, useEffect } from "react";
import styles from "./FormContainer.module.scss";
import { AuthContext } from "../../App";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Navigate } from "react-router-dom";
import { RouteNames } from "../../router";
import { setFormVariant } from "../../store/slices/form-slice/formSlice";
import { IFormVariant } from "../../models/IForm";

interface FormContainerProps {
    children: ReactNode;
}

export const FormContainer: FC<FormContainerProps> = ({ children }) => {
    const { projects } = useAppSelector(
        state => state.projectsReducer
    );

    const isAuth = useContext(AuthContext);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!isAuth) {
            dispatch(setFormVariant(IFormVariant.signIn));
        } else if (!projects.length) {
            dispatch(setFormVariant(IFormVariant.initial));
        }
    }, []);

    return <div className={styles.cnt}>{children}</div>;
};
