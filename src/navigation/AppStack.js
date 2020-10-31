import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import TaskList from "./TasksNavigator";
import AddTask from "../screens/AddTask/AddTask";
import More from "./MoreStack";

const Stack = createStackNavigator();

const AppStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Task Monitor" component={TaskList} />
            <Stack.Screen name="Add Task" component={AddTask} />
            <Stack.Screen name="More" component={More} />
        </Stack.Navigator>
    );
};

export default AppStack;
