import { FC } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/redux";
import { RouteNames } from "../../../router";
import styles from "./LoginBottom.module.scss";
import { IFormVariant } from "../../../types/models/IForm";
import { LinkInner, LinkInnerVariant } from "../link-inner/LinkInner";
import {
    setUserError,
    setUserIsLoading,
} from "../../../store/slices/user-slice/userSlice";

export const LoginBottom: FC = () => {
    const dispatch = useAppDispatch();

    const handeleClick = () => {
        dispatch(setUserError(""));
        dispatch(setUserIsLoading(false));
    };

    return (
        <div className={styles.bottom}>
            <p className={styles.text}>Not registered yet?</p>
            <Link
                onClick={handeleClick}
                to={`/${RouteNames.register}`}
                className={styles.link}
            >
                <LinkInner variant={LinkInnerVariant.side}>
                    {IFormVariant.signUp}
                </LinkInner>
            </Link>
        </div>
    );
};
