import React from "react";
import { View, Text, Clipboard, ToastAndroid } from "react-native";
import { List, TouchableRipple, Divider } from "react-native-paper";
import * as Linking from "expo-linking";

export default function About() {
    return (
        <List.Section
            style={{
                flex: 1,
                marginTop: 0,
                backgroundColor: "#FAFAFA",
                marginBottom: 0,
            }}
        >
            <TouchableRipple
                onPress={() => {
                    Clipboard.setString("Version: Stable 0.2.9");
                    ToastAndroid.show(
                        "Copied to clipboard: Version: Stable 0.2.9",
                        ToastAndroid.SHORT
                    );
                }}
            >
                <List.Item title="Version" description="Stable 0.2.9" />
            </TouchableRipple>
            <TouchableRipple>
                <List.Item title="Build Time" description="13/10/20 12:00 PM" />
            </TouchableRipple>
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
