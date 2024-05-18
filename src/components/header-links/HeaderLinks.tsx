import { FC, useContext } from "react";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { IFormVariant } from "../../types/models/IForm";
import { RouteNames } from "../../router";
import { signOutUser } from "../../store/slices/user-slice/userActionCreators";
import {
    setUserError,
    setUserIsLoading,
} from "../../store/slices/user-slice/userSlice";
import { AppBtn, AppBtnVariant } from "../UI/app-btn/AppBtn";
import { LinkInner, LinkInnerVariant } from "../UI/link-inner/LinkInner";
import styles from "./HeaderLinks.module.scss";
import { AuthContext } from "../../context";

interface HeaderLinksProps {}

export const HeaderLinks: FC<HeaderLinksProps> = () => {
    const { user, userIsLoading } = useAppSelector(state => state.userReducer);

    // const { isAuth } = useContext(AuthContext);

    const dispatch = useAppDispatch();

    const handleSignOut = () => {
        dispatch(signOutUser());
    };

    const handeleClick = () => {
        dispatch(setUserError(""));
        dispatch(setUserIsLoading(false));
    };

    // return isAuth ? (
    return !!user ? (
        <div className={styles.links}>
            {userIsLoading ? (
                <div className={styles.hi}>{IFormVariant.loading}</div>
            ) : (
                <div className={styles.hi}>Hi, {user.displayName}!</div>
                // <div className={styles.hi}>Hi!</div>
            )}
            <AppBtn
                variant={AppBtnVariant.header}
                type="button"
                onClick={handleSignOut}
            >
                Sign out
            </AppBtn>
        </div>
    ) : (
        <div className={styles.links}>
            <NavLink
                onClick={handeleClick}
                to={`${RouteNames.root}${RouteNames.login}`}
            >
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
            <NavLink onClick={handeleClick} to={`/${RouteNames.register}`}>
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
