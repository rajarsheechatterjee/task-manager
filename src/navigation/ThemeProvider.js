import React, { useState, createContext } from "react";
import { lightTheme, darkTheme } from "../theming/themes";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const ThemeContext = createContext({});

export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);

    AsyncStorage.getItem("@theme").then((value) =>
        setDarkMode(JSON.parse(value))
    );

    const handleToggleDarkMode = (previousVal) => {
        setDarkMode(!previousVal);
        AsyncStorage.setItem("@theme", JSON.stringify(!previousVal));
    };

    return (
        <ThemeContext.Provider
            value={{
                toggleDarkMode: () => handleToggleDarkMode(darkMode),
                theme: darkMode ? darkTheme : lightTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};
