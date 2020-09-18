import React from "react";
import { StatusBar, View } from "react-native";
import Navigator from "./src/navigation/authStackNavigator";

export default function App() {
    return (
        <View style={{ flex: 1 }}>
            <StatusBar backgroundColor="#118086" />
            <Navigator />
        </View>
    );
}
