import { useLocation, useNavigate } from "react-router-dom";

export const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const fromPage = location.state?.from?.pathName || "/";

    return <div>login page</div>;
};
