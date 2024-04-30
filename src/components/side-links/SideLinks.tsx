import { FC } from "react";
import { NavLink } from "react-router-dom";
import { IProject } from "../../models/IProject";
import { LinkInner, LinkInnerVariant } from "../UI/link-inner/LinkInner";
import { RouteNames } from "../../router";
import { useAppSelector } from "../../hooks/redux";

interface SideLinksProps {
    project: IProject;
}

export const SideLinks: FC<SideLinksProps> = props => {
    const { project } = props;

	


    return (
        <li>
            <NavLink to={`/${RouteNames.projects}/${project.name}`}>
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
