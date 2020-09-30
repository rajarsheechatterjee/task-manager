import React from "react";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Login from "../screens/Login";
import Signup from "../screens/Signup";
import Loading from "../screens/Loading";

import tabNavigator from "./tabNavigator";

const Stack = createStackNavigator();

function StackNavigator() {
    return (
        <NavigationContainer>
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
        </NavigationContainer>
    );
}

export default StackNavigator;
