import { FC, ReactNode, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { IFormVariant } from "../../models/IForm";
import { setFormVariant } from "../../store/slices/form-slice/formSlice";
import styles from "./FormContainer.module.scss";
import { onAuthStateChanged } from "firebase/auth";
import { auth, database } from "../../firebase";
import { onValue, ref } from "firebase/database";
import { IProject } from "../../models/IProject";
import { Navigate } from "react-router-dom";
import { RouteNames } from "../../router";

interface FormContainerProps {
    children: ReactNode;
}

// export const FormContainer: FC<FormContainerProps> = ({ children }) => {
//     const { projects } = useAppSelector(state => state.projectsReducer);

//     const { isUserAuth } = useAppSelector(state => state.userReducer);

//     const dispatch = useAppDispatch();

//     useEffect(() => {
//         if (!isUserAuth) {
//             dispatch(setFormVariant(IFormVariant.signIn));
//         } else if (!projects.length) {
//             dispatch(setFormVariant(IFormVariant.initial));
//         }
//     }, []);

//     return <div className={styles.cnt}>{children}</div>;
// };

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
            dispatch(setFormVariant(IFormVariant.initial));
        }
    }, []);

    return <div className={styles.cnt}>{children}</div>;

    // return isUserAuth && projects.length && !isOpened ? (
    //     <Navigate to={`/${RouteNames.projects}/${currentProject.id}`} replace />
    // ) : (
    //     <div className={styles.cnt}>{children}</div>
    // );
};
