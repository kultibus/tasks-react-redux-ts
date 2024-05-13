import { FC, useEffect } from "react";
import { Navigate, useNavigation } from "react-router-dom";
import { ProjectLayout } from "../components/project-layout/ProjectLayout";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { setIsFormOpened } from "../store/slices/form-slice/formSlice";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app, auth, database } from "../firebase";
import { getDatabase, onValue, ref } from "firebase/database";

export const ProjectPage: FC = () => {
    const { projects } = useAppSelector(state => state.projectsReducer);

    return projects.length ? <ProjectLayout /> : <Navigate to={`/`} />;
};

export const projectPageLoader = async () => {
    const test = await new Promise(resolve => {
        onAuthStateChanged(auth, user => {
            if (user) {
                onValue(ref(database, `${user.uid}/projects`), snap => {
                    if (snap.exists()) {
                        resolve(snap.val());
                    }
                });
            }
        });
    });

    console.log(test);

    return test;
};

// export const projectPageLoader = async () => {
//     const auth = getAuth(app);
//     const db = getDatabase(app);

//     const user = auth.currentUser;

//     if (user) {
//         const snap = await get(ref(database, `${user.uid}/currentProject`));
// 		console.log(snap)
//     }
// };
