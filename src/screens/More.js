import React from "react";
import { View, Text } from "react-native";
import { Appbar } from "react-native-paper";
import Colors from "../theming/colors";

export default function More() {
    return (
        <Appbar.Header
            statusBarHeight={0}
            style={{ backgroundColor: Colors.accentColor }}
        >
            <Appbar.Content title="More" />
        </Appbar.Header>
    );
}
