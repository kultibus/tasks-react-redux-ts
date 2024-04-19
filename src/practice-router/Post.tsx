import { FC, useEffect, useState } from "react";
import styles from "./AppPractice.module.scss";
import {
    Link,
    Outlet,
    useLoaderData,
    useNavigate,
    useParams,
} from "react-router-dom";
import { plugins } from "../../webpack.config";

export const postLoader = async ({ params }) => {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${params.id}`
    );

    return response.json();
};

export const Post: FC = () => {
    const post = useLoaderData();

    const navigate = useNavigate();

    return (
        <div className={styles.post}>
            <button className={styles.postBtn} onClick={() => navigate(-1)}>
                Go back
            </button>
            <h2 className={styles.postTitle}>{post.title}</h2>
            <p>{post.body}</p>
        </div>
    );
};
