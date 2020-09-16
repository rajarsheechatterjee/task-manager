import React, { useState, useEffect } from "react";

import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";

import { StatusBar } from "react-native";

import Tasks from "../screens/Tasks";
import Login from "../screens/Login";
import Signup from "../screens/Signup";

import tabNavigator from "./tabNavigator";

import firebase from "../../firebase";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

function StackNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Signup"
                    component={Signup}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Task Monitor"
                    component={tabNavigator}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default StackNavigator;
