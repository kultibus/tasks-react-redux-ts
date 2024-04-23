import { useAppSelector } from "./redux";

export function useAuth() {
    const { user } = useAppSelector(state => state.authReducer);

    return { isAuth: !!user.token, ...user };
}
