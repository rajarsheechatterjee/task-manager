import React from "react";
import "react-native-gesture-handler";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import addTaskStack from "./addTaskNavigator";
import taskListStack from "./taskListStackNavigator";

const Tab = createBottomTabNavigator();

function tabNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Your Tasks"
                component={taskListStack}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="format-list-bulleted"
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Add New Task"
                component={addTaskStack}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="pencil-plus"
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default tabNavigator;
