import React from "react";
import { StatusBar, View } from "react-native";
import Navigator from "./src/navigation/authStackNavigator";
import Colors from "./src/theming/colors";

export default function App() {
    return (
        <View style={{ flex: 1 }}>
            <StatusBar backgroundColor={Colors.accentColor} />
            <Navigator />
        </View>
    );
}
