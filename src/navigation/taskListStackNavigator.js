import React from "react";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";

import TaskList from "../screens/Tasks";
import TaskItem from "../screens/TaskItem";
import EditTask from "../screens/EditTask";
import { StatusBar } from "react-native";

const Stack = createStackNavigator();

function StackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Your Tasks"
                component={TaskList}
                options={{
                    headerStyle: {
                        backgroundColor: "#118086",
                    },
                    headerTintColor: "white",
                    headerLeft: false,
                }}
            />
            <Stack.Screen
                name="TaskItem"
                component={TaskItem}
                options={{
                    headerTitle: "Task Item",
                    headerStyle: {
                        backgroundColor: "#118086",
                    },
                    headerTintColor: "white",
                }}
            />
            <Stack.Screen
                name="EditTask"
                component={EditTask}
                options={{
                    headerTitle: "Edit Task Details",
                    headerStyle: {
                        backgroundColor: "#118086",
                    },
                    headerTintColor: "white",
                }}
            />
        </Stack.Navigator>
    );
}

export default StackNavigator;
