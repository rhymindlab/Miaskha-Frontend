import { createContext, useEffect, useState } from "react";
import { checkLogin } from "../lib/User"; // <-- adjust path if needed

export const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function init() {

            await checkLogin(setLoggedIn, setUser);

            setLoading(false);

        }

        init();

    }, []);

    return (

        <AuthContext.Provider
            value={{
                loggedIn,
                setLoggedIn,
                user,
                setUser,
                showLogin,
                setShowLogin,
                loading,
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}