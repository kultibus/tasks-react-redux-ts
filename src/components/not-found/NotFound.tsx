import { FC } from "react";
import { Link, useNavigate, useRouteError } from "react-router-dom";
import { RouteNames } from "../../router";
import styles from "./NotFound.module.scss";
import { AppBtn, AppBtnVariant } from "../UI/app-btn/AppBtn";

// interface NotFoundProps {
//     message: string;
//     status: string;
// }

// export const NotFound: FC<NotFoundProps> = ({ message, status }) => {
//     return (
//         <div className={styles.cnt}>
//             <h2 className={styles.title}>{status}</h2>
//             <div className={styles.message}>{message}</div>
//             <Link className={styles.link} to={RouteNames.home}>
//                 Go back
//             </Link>
//         </div>
//     );
// };

export const NotFound: FC = () => {
    const error = useRouteError();

    const message = (error as { data?: string })?.data;
    const status = (error as { status?: string })?.status;

    return (
        <div className={styles.cnt}>
            <h2 className={styles.title}>{status}</h2>
            <div className={styles.message}>{message}</div>
            <Link className={styles.link} to={"/"}>
                Go home
            </Link>
        </div>
    );
};
