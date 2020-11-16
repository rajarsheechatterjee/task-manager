import React, { useState, useEffect, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";

import AppStack from "./AppStack";
import AuthStack from "./AuthStack";

import { AuthUserContext } from "./AuthUserProvider";
import { auth } from "../utils/firebase";

import Spinner from "../components/Spinner";

const Router = () => {
    const { user, setUser } = useContext(AuthUserContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribeAuth = auth.onAuthStateChanged(async (authUser) => {
            try {
                await (authUser ? setUser(authUser) : setUser(null));
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        });

        return unsubscribeAuth;
    }, []);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <NavigationContainer>
            {user ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    );
};

export default Router;
