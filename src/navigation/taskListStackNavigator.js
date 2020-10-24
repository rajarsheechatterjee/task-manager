import React from "react";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import Colors from "../theming/colors";

import TaskList from "../screens/TaskList/Tasks";
import TaskItem from "../screens/TaskItem/TaskItem";
import EditTask from "../screens/EditTask";

const Stack = createStackNavigator();

function StackNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Your Tasks" component={TaskList} />
            <Stack.Screen name="Task Item" component={TaskItem} />
            <Stack.Screen name="EditTask" component={EditTask} />
        </Stack.Navigator>
    );
}

export default StackNavigator;
