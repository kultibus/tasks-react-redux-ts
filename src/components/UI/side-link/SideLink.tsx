import { FC } from "react";
import { NavLink } from "react-router-dom";
import { RouteNames } from "../../../router";
import { IProject } from "../../../types/models/IProject";
import { LinkInner, LinkInnerVariant } from "../link-inner/LinkInner";
import { useAppSelector } from "../../../hooks/redux";

interface SideLinkProps {
    project: IProject;
    handleClick: () => void;
}

export const SideLink: FC<SideLinkProps> = props => {
    const { project, handleClick } = props;

    const { activeProject } = useAppSelector(state => state.projectsReducer);

    return (
        <li>
            <NavLink
                onClick={handleClick}
                to={`/${RouteNames.project}/${project.name}`}
            >
                {({ isActive }) => (
                    <LinkInner
                        variant={
                            isActive && project.id === activeProject.id
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
