import React from "react";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import Colors from "../theming/colors";

import More from "../screens/More/More";
import About from "../screens/More/About";
import Settings from "../screens/More/Settings";

const Stack = createStackNavigator();

function StackNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="More" component={More} />
            <Stack.Screen name="About" component={About} />
            <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
    );
}

export default StackNavigator;
