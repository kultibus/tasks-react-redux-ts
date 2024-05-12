import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { IFormVariant } from "../../models/IForm";
import { setFormVariant } from "../../store/slices/form-slice/formSlice";
import { Board } from "../board/Board";
import { List, ListVariant } from "../list/List";
import styles from "./Boards.module.scss";

export const Boards: FC = () => {
    const { boards } = useAppSelector(state => state.boardsReducer);

    const { projects, currentProject } = useAppSelector(
        state => state.projectsReducer
    );

    // const { isUserAuth } = useAppSelector(state => state.userReducer);

    // const dispatch = useAppDispatch();

    // useEffect(() => {
    //     if (projects.length) {
    //         dispatch(setFormVariant(IFormVariant.addProject));
    //     }
    // }, []);

    return (
        <main className={styles.boards}>
            <List
                variant={ListVariant.boards}
                items={boards}
                renderItem={board => <Board board={board} key={board.name} />}
            />
        </main>
    );
};
