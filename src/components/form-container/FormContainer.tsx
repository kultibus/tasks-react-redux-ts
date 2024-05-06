import { FC, ReactNode, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { IFormVariant } from "../../models/IForm";
import { setFormVariant } from "../../store/slices/form-slice/formSlice";
import styles from "./FormContainer.module.scss";

interface FormContainerProps {
    children: ReactNode;
}

export const FormContainer: FC<FormContainerProps> = ({ children }) => {
    const { projects } = useAppSelector(state => state.projectsReducer);

    const { isUserAuth } = useAppSelector(state => state.userReducer);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!isUserAuth) {
            dispatch(setFormVariant(IFormVariant.signIn));
        } else if (!projects.length) {
            dispatch(setFormVariant(IFormVariant.initial));
        }
    }, []);

    return <div className={styles.cnt}>{children}</div>;
};
