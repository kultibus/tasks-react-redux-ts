import { FC, ReactNode, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { IFormVariant } from "../../models/IForm";
import { setFormVariant } from "../../store/slices/form-slice/formSlice";
import styles from "./FormContainer.module.scss";
import { LoaderFunctionArgs, useParams } from "react-router-dom";

interface FormContainerProps {
    children: ReactNode;
}

export const FormContainer: FC<FormContainerProps> = ({ children }) => {
    const { projects, currentProject } = useAppSelector(
        state => state.projectsReducer
    );

    const { isUserAuth } = useAppSelector(state => state.userReducer);
    const { isOpened } = useAppSelector(state => state.formReducer);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!isUserAuth) {
            dispatch(setFormVariant(IFormVariant.signIn));
        } else if (!projects.length) {
            dispatch(setFormVariant(IFormVariant.initialProject));
        }
    }, []);

    return <div className={styles.cnt}>{children}</div>;
};
