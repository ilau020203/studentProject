import { createContext } from "react";

function noop() {}

export const AuthContext = createContext(
    {
        token: null,
        refreshToken: null,
        login: noop,
        logout: noop,
        isAuthenticated: false,
        id:null,
        language:'en',
        setLanguage:noop
    }
)