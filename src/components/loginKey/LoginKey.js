import React, { useEffect, createContext, useState } from "react";

const LoginKeyContext = createContext();

const getLoginKey = () => {
    const loginKey = localStorage.getItem("loginKey");
    if (!loginKey) {
        localStorage.setItem("loginKey", 'null');
        return 'null';
    } else {
        return loginKey;
    }
};

const LoginKeyProvider = ({ children }) => {
    const [loginKey, setLoginKey] = useState(getLoginKey);

    function toggleLoginKey(initial) {
        setLoginKey(initial);
    };

    useEffect(() => {
        const refreshTheme = () => {
            localStorage.setItem("loginKey", loginKey);
        };

        refreshTheme();
    }, [loginKey]);

    return (
        <LoginKeyContext.Provider
            value={{
                loginKey,
                setLoginKey,
                toggleLoginKey,
            }}
        >
            {children}
        </LoginKeyContext.Provider>
    );
};

export { LoginKeyContext, LoginKeyProvider };