import { FC } from "react";
import { Projects } from "../components/projects/Projects";
import { FormContainer } from "../components/form-container/FormContainer";
import { FormProject, FormProjectVariant } from "../components/UI/forms/form-project/FormProject";

export const HomePage: FC = () => {
    return (
        <FormContainer>
            <FormProject variant={FormProjectVariant.createProject} />
        </FormContainer>
    );
};
