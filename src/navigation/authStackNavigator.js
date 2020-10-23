import React from "react";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "../screens/Login";
import Signup from "../screens/Signup";
import Loading from "../screens/Loading";
import taskListNavigator from "./taskListStackNavigator";
import AddTask from "../screens/AddTask/AddTask";
import More from "./moreStackNavigator";

const Stack = createStackNavigator();

function StackNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Loading" component={Loading} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Task Monitor" component={taskListNavigator} />
            <Stack.Screen name="Add Task" component={AddTask} />
            <Stack.Screen name="More" component={More} />
        </Stack.Navigator>
    );
}

export default StackNavigator;
