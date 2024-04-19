import {
    Route,
    Routes,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import { AppPractice } from "./practice-router/AppPractice";
import { About } from "./practice-router/About";
import { Home } from "./practice-router/Home";
import { Blog, blogLoader } from "./practice-router/Blog";
import { Post, postLoader } from "./practice-router/Post";

// export const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <AppPractice />,
//         children: [
//             { index: true, element: <Home /> },
//             { path: "/about", element: <About /> },
//             { path: "/blog", element: <Blog /> },
//             { path: "/blog/:id", element: <Post /> },
//         ],
//     },
// ]);

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<AppPractice />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="blog" element={<Blog />} loader={blogLoader} />
            <Route path="blog/:id" element={<Post />} loader={postLoader} />
            {/* <Route path="*" element={<ErrorPage />} /> */}
        </Route>
    )
);
