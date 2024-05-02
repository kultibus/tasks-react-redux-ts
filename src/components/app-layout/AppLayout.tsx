import { FC, ReactNode } from "react";
import { Outlet, useRouteError } from "react-router-dom";
import { Header } from "../header/Header";
import { MainCnt } from "../main-cnt/MainCnt";
import { NotFound } from "../not-found/NotFound";
import styles from "./AppLayout.module.scss";

// interface AppLayoutProps {
//     error: unknown;
// }

// export const AppLayout: FC<AppLayoutProps> = ({ error }) => {
//     const message = (error as { data?: string })?.data;
//     const status = (error as { status?: string })?.status;

//     return (
//         <div className={styles.appCnt}>
//             <Header />
//             <MainCnt>
//                 {error ? (
//                     <NotFound message={message} status={status} />
//                 ) : (
//                     <Outlet />
//                 )}
//             </MainCnt>
//         </div>
//     );
// };

interface AppLayoutProps {
    children: ReactNode;
}

export const AppLayout: FC<AppLayoutProps> = ({ children }) => {
    return <div className={styles.appCnt}>{children}</div>;
};
