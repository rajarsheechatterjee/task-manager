import React from "react";
import Navigator from "./src/navigation/Router";
import { AuthUserProvider } from "./src/navigation/AuthUserProvider";

export default function App() {
    return (
        <AuthUserProvider>
            <Navigator />
        </AuthUserProvider>
    );
}
