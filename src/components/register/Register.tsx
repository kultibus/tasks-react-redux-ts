import { FC } from "react";
import styles from "./Register.module.scss";
import { useAppSelector } from "../../hooks/redux";
import { Navigate } from "react-router-dom";
import { RouteNames } from "../../router";

export const Register: FC = () => {
    const { isAuth } = useAppSelector(state => state.authReducer);

    if (isAuth) {
        return <Navigate to={RouteNames.home} replace />;
    }

    return (
        <div className={styles.cnt}>
            <div className={styles.login}>Register</div>
        </div>
    );
};
