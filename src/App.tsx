import { FC } from "react";
import classes from "./App.module.scss";
import { Header } from "./components/Header/Header";

export const App: FC = () => {
    return (
        <div className={classes.app}>
            <Header />
        </div>
    );
};
