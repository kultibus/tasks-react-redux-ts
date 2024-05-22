import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { FC, ReactNode } from "react";

interface DraggableProps {
    children?: ReactNode;
    childrenId: string;
}

export const Draggable: FC<DraggableProps> = props => {
    const { children, childrenId } = props;

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: childrenId,
    });

    const style = {
        transform: CSS.Translate.toString(transform),
    };

    return (
        <li ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {children}
        </li>
    );
};
