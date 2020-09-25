import React from "react";
import "react-native-gesture-handler";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Colors from "../theming/colors";

import addTaskStack from "./addTaskNavigator";
import taskListStack from "./taskListStackNavigator";
import More from "./moreStackNavigator";

const Tab = createMaterialBottomTabNavigator();

function tabNavigator({ navigation }) {
    return (
        <Tab.Navigator
            activeColor={Colors.accentColor}
            tabBarOptions={{
                activeTintColor: Colors.accentColor,
                keyboardHidesTabBar: true,
            }}
            barStyle={{ backgroundColor: "white" }}
            // shifting={true}
        >
            <Tab.Screen
                name="Your Tasks"
                component={taskListStack}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="format-list-bulleted"
                            color={color}
                            size={22}
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
                            size={22}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="More"
                component={More}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="dots-horizontal"
                            color={color}
                            size={24}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default tabNavigator;
