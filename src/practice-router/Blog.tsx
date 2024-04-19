import { FC, useEffect, useState } from "react";
import styles from "./AppPractice.module.scss";
import { Link, Outlet, useLoaderData } from "react-router-dom";
import { plugins } from "../../webpack.config";
import { NavLink } from "react-router-dom";

export const blogLoader = async () => {
    const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts?_limit=10"
    );
    return response.json();
};

export const Blog: FC = () => {
    const posts = useLoaderData();

    return (
        <div className={styles.page}>
            <ul className={styles.posts}>
                {posts.map(post => (
                    <li key={post.id} className={styles.postsItem}>
                        <Link className={styles.link} to={`${post.id}`}>
                            {post.id}. {post.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};
