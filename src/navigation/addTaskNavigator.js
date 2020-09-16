import React, { useState, useEffect } from "react";

import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { StatusBar } from "react-native";

import AddTask from "../screens/AddTask";

import firebase from "../../firebase";

const Stack = createStackNavigator();

function StackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Add New Task"
                component={AddTask}
                options={{
                    headerStyle: {
                        backgroundColor: "#118086",
                    },
                    headerTintColor: "white",
                    headerLeft: false,
                }}
            />
        </Stack.Navigator>
    );
}

export default StackNavigator;
