import { DndContext, useDraggable } from "@dnd-kit/core";
import { FC, ReactNode } from "react";
import styles from "./Draggble.module.scss";

interface DraggableProps {
    children?: ReactNode;
}

export function Draggable({ children }: DraggableProps) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: "draggable",
    });
    const style = transform
        ? {
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
          }
        : undefined;

    return (
        <div
            className={styles.draggble}
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
        >
            {children}
        </div>
    );
}
