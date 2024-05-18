import { FC, MouseEvent } from "react";
import { NavLink } from "react-router-dom";
import { IProject } from "../../../types/models/IProject";
import { RouteNames } from "../../../router";
import { LinkInner, LinkInnerVariant } from "../link-inner/LinkInner";

interface SideLinkProps {
    project: IProject;
    handleClick: (e: MouseEvent<HTMLAnchorElement>) => void;
}

export const SideLink: FC<SideLinkProps> = props => {
    const { project, handleClick } = props;

    return (
        <li>
            <NavLink
                onClick={handleClick}
                data-project-id={project.id}
                to={`/${RouteNames.project}/${project.id}`}
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
