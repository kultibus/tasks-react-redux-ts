import { useDraggable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FC, ReactNode } from "react";

interface SortableItemProps {
    children?: ReactNode;
    childrenId: string;
}

export const SortableItem: FC<SortableItemProps> = props => {
    const { children, childrenId } = props;

    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: childrenId });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <li ref={setNodeRef} style={style} {...attributes} {...listeners}>
            {children}
        </li>
    );
};
