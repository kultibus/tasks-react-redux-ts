import { FC, useContext, useEffect } from "react";
import { ITaskState } from "../../models/ITask";
import { Board } from "../board/Board";
import { List, ListVariant } from "../list/List";
import styles from "./Boards.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { AuthContext } from "../../App";
import { LoaderFunctionArgs, Navigate, json, redirect } from "react-router-dom";
import { RouteNames } from "../../router";
import { setFormVariant } from "../../store/slices/form-slice/formSlice";
import { IFormVariant } from "../../models/IForm";
import { onAuthStateChanged } from "firebase/auth";
import { auth, database } from "../../firebase";
import { get, onValue, ref } from "firebase/database";

export const Boards: FC = () => {
    const { boards } = useAppSelector(state => state.boardsReducer);

    const { projects, currentProject } = useAppSelector(
        state => state.projectsReducer
    );

    const { isUserAuth } = useAppSelector(state => state.userReducer);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (projects.length) {
            dispatch(setFormVariant(IFormVariant.addProject));
        }
    }, []);

    return (
        <main className={styles.boards}>
            <List
                variant={ListVariant.boards}
                items={boards}
                renderItem={board => <Board board={board} key={board.name} />}
            />
        </main>
    );

    // return isUserAuth && projects.length ? (
    //     <main className={styles.boards}>
    //         <List
    //             variant={ListVariant.boards}
    //             items={boards}
    //             renderItem={board => <Board board={board} key={board.name} />}
    //         />
    //     </main>
    // ) : (
    //     <Navigate to={`/${RouteNames.projects}`} replace />
    // );
};
