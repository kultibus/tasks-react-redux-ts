import { FC, useEffect, useMemo } from "react";
import { Navigate } from "react-router-dom";
import { FormProject } from "../components/UI/form-project/FormProject";
import { FormContainer } from "../components/form-container/FormContainer";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { RouteNames } from "../router";
import { IFormVariant } from "../models/IForm";
import { setFormVariant } from "../store/slices/form-slice/formSlice";
import { ProjectsLayout } from "../components/projects-layout/ProjectsLayout";

export const HomePage: FC = () => {
    return <ProjectsLayout />;
};
