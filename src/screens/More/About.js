import React from "react";
import { View, Text } from "react-native";
import { List, TouchableRipple, Divider } from "react-native-paper";
import * as Linking from "expo-linking";

export default function About() {
    return (
        <List.Section style={{ marginTop: 0 }}>
            <TouchableRipple onPress={() => console.log("XDD")}>
                <List.Item title="Version" description="Stable 0.2.1" />
            </TouchableRipple>
            <List.Item title="Build Time" description="25/09/20 8:00 PM" />
            <Divider />
            <TouchableRipple
                onPress={() =>
                    Linking.openURL(
                        "https://github.com/rajarsheechatterjee/shigoto"
                    )
                }
            >
                <List.Item
                    title="Github"
                    description="https://github.com/rajarsheechatterjee/shigoto"
                />
            </TouchableRipple>
        </List.Section>
    );
}
