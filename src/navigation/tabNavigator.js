import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import addTaskStack from "./addTaskNavigator";
import taskStack from "./taskStackNavigator";

import { NavigationContainer } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

function tabNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Your Tasks"
                component={taskStack}
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
                            name="plus"
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
