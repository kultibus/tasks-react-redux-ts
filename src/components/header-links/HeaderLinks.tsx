import { FC, ReactNode } from "react";
import styles from "./HeaderLinks.module.scss";
import { BtnVariant, Button } from "../UI/buttons/Button";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { signout } from "../../store/slices/auth-slice/actionCreators";
import { RouteNames } from "../../router";
import { NavLink } from "react-router-dom";

interface HeaderLinksProps {}

export const HeaderLinks: FC<HeaderLinksProps> = () => {
    const { isAuth, user, isLoading } = useAppSelector(
        state => state.authReducer
    );

    const dispatch = useAppDispatch();

    return isAuth ? (
        <div className={styles.links}>
            <div className={styles.hi}>Hi, {user.displayName}!</div>
            <Button
                variant={BtnVariant.header}
                type="button"
                onClick={() => dispatch(signout())}
            >
                Sign out
            </Button>
        </div>
    ) : isLoading ? (
        <div className={styles.links}>Loading...</div>
    ) : (
        <div className={styles.links}>
            <NavLink to={`/${RouteNames.login}`}>
                {({ isActive }) => (
                    <Button
                        variant={
                            isActive
                                ? BtnVariant.headerAcive
                                : BtnVariant.header
                        }
                    >
                        {RouteNames.login}
                    </Button>
                )}
            </NavLink>
            <NavLink to={`/${RouteNames.register}`}>
                {({ isActive }) => (
                    <Button
                        type="button"
                        variant={
                            isActive
                                ? BtnVariant.headerAcive
                                : BtnVariant.header
                        }
                    >
                        {RouteNames.register}
                    </Button>
                )}
            </NavLink>
        </div>
    );
};
