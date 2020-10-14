import React from "react";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "../screens/Login";
import Signup from "../screens/Signup";
import Loading from "../screens/Loading";

import tabNavigator from "./tabNavigator";

const Stack = createStackNavigator();

function StackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Loading"
                component={Loading}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Signup"
                component={Signup}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Task Monitor"
                component={tabNavigator}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export default StackNavigator;
