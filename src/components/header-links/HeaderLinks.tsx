import { FC, ReactNode } from "react";
import styles from "./HeaderLinks.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { signout } from "../../store/slices/auth-slice/authActionCreators";
import { RouteNames } from "../../router";
import { NavLink } from "react-router-dom";
import { AppBtn, AppBtnVariant } from "../UI/app-btn/AppBtn";
import { LinkInner, LinkInnerVariant } from "../UI/link-inner/LinkInner";

interface HeaderLinksProps {}

export const HeaderLinks: FC<HeaderLinksProps> = () => {
    const { isAuth, user } = useAppSelector(state => state.authReducer);

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
