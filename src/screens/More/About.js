import React from "react";
import { View, Text, Clipboard, ToastAndroid } from "react-native";
import { List, TouchableRipple, Divider } from "react-native-paper";
import * as Linking from "expo-linking";
import * as Updates from "expo-updates";

export default function About() {
    const checkForUpdates = async () => {
        ToastAndroid.show("Searching for updates...", ToastAndroid.SHORT);
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
            Alert.alert(
                "New Version Available",
                "### New",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel",
                    },
                    {
                        text: "Download",
                        onPress: async () => {
                            await Updates.fetchUpdateAsync();
                            await Updates.reloadAsync();
                        },
                    },
                ],
                { cancelable: false }
            );
        } else {
            ToastAndroid.show("No new updates available", ToastAndroid.SHORT);
        }
    };
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
                    Clipboard.setString("Version: Stable 0.3.4");
                    ToastAndroid.show(
                        "Copied to clipboard: Version: Stable 0.3.4",
                        ToastAndroid.SHORT
                    );
                }}
            >
                <List.Item title="Version" description="Stable 0.3.4" />
            </TouchableRipple>
            <TouchableRipple>
                <List.Item title="Build Time" description="23/10/20  8:00 AM" />
            </TouchableRipple>
            <TouchableRipple onPress={checkForUpdates}>
                <List.Item title="Check for updates" />
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
