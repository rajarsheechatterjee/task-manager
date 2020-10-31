import React from "react";
import Navigator from "./src/navigation/Router";
import { AuthUserProvider } from "./src/navigation/AuthUserProvider";
import { ThemeProvider } from "./src/navigation/ThemeProvider";

import { enableScreens } from "react-native-screens";
enableScreens();

const App = () => {
    return (
        <ThemeProvider>
            <AuthUserProvider>
                <Navigator />
            </AuthUserProvider>
        </ThemeProvider>
    );
};
export default App;
