import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import styles from "./LinkChild.module.scss";
import classNames from "classnames";

export enum LinkChildVariant {
    link = "link",
    active = "active",
}

interface LinkChildProps {
    children: ReactNode;
    variant: LinkChildVariant;
}

export const LinkChild: FC<LinkChildProps> = props => {
    const { children, variant } = props;

    return (
        <button className={classNames(styles[variant])} {...props}>
            {children}
        </button>
    );
};
