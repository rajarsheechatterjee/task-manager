import React from "react";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import Colors from "../theming/colors";

import TaskList from "../screens/TaskList/Tasks";
import TaskItem from "../screens/TaskItem/TaskItem";
import EditTask from "../screens/EditTask";

const Stack = createStackNavigator();

function StackNavigator({ navigation }) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Your Tasks"
                component={TaskList}
                options={{
                    headerStyle: {
                        backgroundColor: Colors.accentColor,
                    },
                    headerTintColor: "white",
                    headerLeft: false,
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="TaskItem"
                component={TaskItem}
                options={{
                    headerTitle: "Task Item",
                    headerStyle: {
                        backgroundColor: Colors.accentColor,
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
                        backgroundColor: Colors.accentColor,
                    },
                    headerTintColor: "white",
                }}
            />
        </Stack.Navigator>
    );
}

export default StackNavigator;
