import React from "react";
import { View, Text } from "react-native";
import { List, TouchableRipple } from "react-native-paper";
import { Appbar } from "react-native-paper";
import Colors from "../../theming/colors";
import { MaterialIcons } from "@expo/vector-icons";

export default function More({ navigation }) {
    return (
        <>
            <Appbar.Header
                statusBarHeight={0}
                style={{ backgroundColor: Colors.accentColor }}
            >
                <Appbar.Content title="More" />
            </Appbar.Header>
            <List.Section>
                <TouchableRipple
                    onPress={() => navigation.navigate("Settings")}
                    rippleColor="rgba(0, 0, 0, 0.2)"
                >
                    <List.Item
                        title="Settings"
                        left={() => (
                            <List.Icon
                                color={Colors.accentColor}
                                icon="settings-outline"
                            />
                        )}
                    />
                </TouchableRipple>
                <TouchableRipple
                    onPress={() => navigation.navigate("About")}
                    rippleColor="rgba(0, 0, 0, 0.2)"
                >
                    <List.Item
                        title="About"
                        left={() => (
                            <List.Icon
                                color={Colors.accentColor}
                                icon="information-outline"
                            />
                        )}
                    />
                </TouchableRipple>
            </List.Section>
        </>
    );
}
