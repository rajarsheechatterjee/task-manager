import React from "react";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import Colors from "../theming/colors";

import More from "../screens/More/More";
import About from "../screens/More/About";
import Settings from "../screens/More/Settings";

const Stack = createStackNavigator();

function StackNavigator({ navigation }) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="More"
                component={More}
                options={{
                    headerStyle: {
                        backgroundColor: Colors.accentColor,
                    },
                    headerTintColor: "white",
                    headerLeft: false,
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="About"
                component={About}
                options={{
                    headerTitle: "About",
                    headerStyle: {
                        backgroundColor: Colors.accentColor,
                    },
                    headerTintColor: "white",
                }}
            />
            <Stack.Screen
                name="Settings"
                component={Settings}
                options={{
                    headerTitle: "Settings",
                    headerStyle: {
                        backgroundColor: Colors.accentColor,
                    },
                    headerTintColor: "white",
                }}
            />
        </Stack.Navigator>
    );
}

export default StackNavigator;
