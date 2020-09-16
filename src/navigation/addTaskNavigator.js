import React, { useState, useEffect } from "react";

import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { StatusBar } from "react-native";

import Home from "../screens/Home";

import firebase from "../../firebase";

const Stack = createStackNavigator();

function StackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Add a new Task or Reminder"
                component={Home}
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
