import React, { useState, createContext } from "react";
import { lightTheme, darkTheme } from "../theming/themes";

export const ThemeContext = createContext({});

export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(true);

    return (
        <ThemeContext.Provider
            value={{
                toggleDarkMode: () => {
                    setDarkMode((previousVal) => !previousVal);
                },
                theme: darkMode ? darkTheme : lightTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};
