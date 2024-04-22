import { useAppSelector } from "./redux";

export function useAuth() {
    const { user } = useAppSelector(state => state.userReducer);

    return { isAuth: !!user.email, ...user };
}
