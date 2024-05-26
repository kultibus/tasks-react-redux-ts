import {
    DndContext,
    MouseSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { FC } from "react";
import { useAppSelector } from "../../hooks/redux";
import { IFormVariant } from "../../types/models/IForm";
import { FormTask } from "../UI/form-task/FormTask";
import { Board } from "../board/Board";
import { List, ListVariant } from "../list/List";
import styles from "./Boards.module.scss";
import { useTasks } from "./useTasks";
import { SortableContext } from "@dnd-kit/sortable";

export enum IBoardVariant {
    opened = "opened",
    inProcess = "inProcess",
    done = "done",
}

export const Boards: FC = () => {
    const boards = [
        IBoardVariant.opened,
        IBoardVariant.inProcess,
        IBoardVariant.done,
    ];

    const currentTasks = useTasks();

    const { variant, isOpened } = useAppSelector(state => state.formReducer);

    const mouseSensor = useSensor(PointerSensor, {
        activationConstraint: {
            distance: 1,
        },
    });

    const sensors = useSensors(mouseSensor);

    if (
        isOpened &&
        (variant === IFormVariant.addTask ||
            variant === IFormVariant.editTask ||
            variant === IFormVariant.deleteTask)
    ) {
        return <FormTask />;
    }

    return (
        <main className={styles.boards}>
            <DndContext sensors={sensors}>
                <List
                    variant={ListVariant.boards}
                    items={boards}
                    renderItem={board => (
                        <SortableContext items={currentTasks[board]}>
                            <Board
                                tasks={currentTasks[board]}
                                board={board}
                                key={board}
                            />
                        </SortableContext>
                    )}
                />
            </DndContext>
        </main>
    );
};
