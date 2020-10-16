import { DefaultTheme, DarkTheme as PaperDarkTheme } from "react-native-paper";

export const LightTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: "#FFFFFF",
    },
};

export const DarkTheme = {
    ...PaperDarkTheme,
    colors: {
        ...PaperDarkTheme.colors,
        background: "#000000",
    },
};
