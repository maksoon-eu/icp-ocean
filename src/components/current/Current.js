import React, { useEffect, createContext, useState } from "react";

const CurrentContext = createContext();

const getCurrent = () => {
    const current = localStorage.getItem("current");
    if (!current) {
        localStorage.setItem("current", "ETH");
        return "ETH";
    } else {
        return current;
    }
};

const CurrentProvider = ({ children }) => {
    const [current, setCurrent] = useState(getCurrent);

    function toggleCurrent(current) {
        setCurrent(current);
    };

    useEffect(() => {
        const refreshCurrent = () => {
            localStorage.setItem("current", current);
        };

        refreshCurrent();
    }, [current]);

    return (
        <CurrentContext.Provider
        value={{
            current,
            setCurrent,
            toggleCurrent,
        }}
        >
        {children}
        </CurrentContext.Provider>
    );
};

export { CurrentContext, CurrentProvider };