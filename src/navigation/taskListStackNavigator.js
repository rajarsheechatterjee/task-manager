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
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Task Item"
                component={TaskItem}
                options={{
                    headerStyle: { backgroundColor: Colors.accentColor },
                    headerTintColor: "white",
                }}
            />
            <Stack.Screen
                name="EditTask"
                component={EditTask}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
}

export default StackNavigator;
