import { FC, ReactNode } from "react";
import styles from "./HeaderLinks.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { signout } from "../../store/slices/auth-slice/actionCreators";
import { RouteNames } from "../../router";
import { NavLink } from "react-router-dom";
import { LinkInner, LinkInnerVariant } from "../link-inner/LinkInner";
import { AppBtn, AppBtnVariant } from "../UI/app-btn/AppBtn";

interface HeaderLinksProps {}

export const HeaderLinks: FC<HeaderLinksProps> = () => {
    const { isAuth, user, isLoading } = useAppSelector(
        state => state.authReducer
    );

    const dispatch = useAppDispatch();

    return isAuth ? (
        <div className={styles.links}>
            <div className={styles.hi}>Hi, {user.displayName}!</div>
            <AppBtn
                variant={AppBtnVariant.header}
                type="button"
                onClick={() => dispatch(signout())}
            >
                Sign out
            </AppBtn>
        </div>
    ) : isLoading ? (
        <div className={styles.links}>Loading...</div>
    ) : (
        <div className={styles.links}>
            <NavLink to={`/${RouteNames.login}`}>
                {({ isActive }) => (
                    <LinkInner
                        variant={
                            isActive
                                ? LinkInnerVariant.headerActive
                                : LinkInnerVariant.header
                        }
                    >
                        {RouteNames.login}
                    </LinkInner>
                )}
            </NavLink>
            <NavLink to={`/${RouteNames.register}`}>
                {({ isActive }) => (
                    <LinkInner
                        variant={
                            isActive
                                ? LinkInnerVariant.headerActive
                                : LinkInnerVariant.header
                        }
                    >
                        {RouteNames.register}
                    </LinkInner>
                )}
            </NavLink>
        </div>
    );
};
