import React, { useState, useEffect } from "react";

import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { StatusBar } from "react-native";

import Home from "../screens/Home";
import Login from "../screens/Login";

import firebase from "../../firebase";

const Stack = createStackNavigator();

function StackNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{
                        headerStyle: {
                            backgroundColor: "purple",
                        },
                        headerTintColor: "white",
                    }}
                />
                <Stack.Screen name="Login" component={Login} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default StackNavigator;
