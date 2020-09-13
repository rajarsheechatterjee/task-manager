import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableOpacity,
} from "react-native";

import Navigator from "./src/navigation/stackNavigator";

import Login from "./src/screens/Login";
import Home from "./src/screens/Home";

// import firebase from "./firebase";

export default function App() {
    return <Navigator />;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
    },
});
