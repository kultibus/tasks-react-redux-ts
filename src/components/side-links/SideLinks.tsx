import { FC, MouseEvent } from "react";
import { NavLink } from "react-router-dom";
import { IProject } from "../../models/IProject";
import { RouteNames } from "../../router";
import { LinkInner, LinkInnerVariant } from "../UI/link-inner/LinkInner";
import styles from "./SideLinks.module.scss";

interface SideLinksProps {
    project: IProject;
    handleClick: (e: MouseEvent<HTMLAnchorElement>) => void;
}

export const SideLinks: FC<SideLinksProps> = props => {
    const { project, handleClick } = props;


    return (
        <li>
            <NavLink
                onClick={handleClick}
                data-project-id={project.id}
                to={`/${RouteNames.projects}/${project.id}`}
            >
                {({ isActive }) => (
                    <LinkInner
                        variant={
                            isActive
                                ? LinkInnerVariant.sideActive
                                : LinkInnerVariant.side
                        }
                    >
                        {project.name}
                    </LinkInner>
                )}
            </NavLink>
        </li>
    );
};
