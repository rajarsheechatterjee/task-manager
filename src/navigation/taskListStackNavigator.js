import React from "react";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";

import TaskList from "../screens/Tasks";
import TaskItem from "../screens/TaskItem";

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
                    headerTitle: "",
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
