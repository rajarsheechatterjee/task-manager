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
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Loading" component={Loading} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Task Monitor" component={tabNavigator} />
        </Stack.Navigator>
    );
}

export default StackNavigator;
