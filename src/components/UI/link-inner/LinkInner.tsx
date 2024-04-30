import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import styles from "./LinkInner.module.scss";
import classNames from "classnames";

export enum LinkInnerVariant {
    side = "side",
    sideActive = "sideActive",
    header = "header",
    headerActive = "headerActive",
}

interface LinkInnerProps {
    children: ReactNode;
    variant: LinkInnerVariant;
}

export const LinkInner: FC<LinkInnerProps> = props => {
    const { children, variant } = props;

    return (
        <span className={classNames(styles[variant])} {...props}>
            {children}
        </span>
    );
};
