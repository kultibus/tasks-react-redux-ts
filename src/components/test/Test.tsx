import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { FC, useState } from "react";
import { Droppable } from "./Droppable";
import { Draggable } from "./Draggble";

export const Test: FC = () => {
    return (
        <DndContext>
            <Draggable>Drag me</Draggable>
        </DndContext>
    );
};
