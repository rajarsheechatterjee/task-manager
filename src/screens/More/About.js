import React from "react";
import { Clipboard, ToastAndroid } from "react-native";
import { List, Divider } from "react-native-paper";
import * as Linking from "expo-linking";
import * as Updates from "expo-updates";

export default function About() {
    const checkForUpdates = async () => {
        ToastAndroid.show("Searching for updates...", ToastAndroid.SHORT);
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
            Alert.alert(
                "New Version Available",
                "A new version is available for download",
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
    const handleCopyVersion = () => {
        Clipboard.setString("Version: Stable 0.3.5");
        ToastAndroid.show(
            "Copied to clipboard: Version: Stable 0.3.5",
            ToastAndroid.SHORT
        );
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
            <List.Item
                title="Version"
                description="Stable 0.3.5"
                onPress={handleCopyVersion}
            />
            <List.Item title="Build Time" description="23/10/20  3:00 PM" />
            <List.Item title="Check for updates" onPress={checkForUpdates} />
            <List.Item
                title="What's new"
                onPress={() =>
                    Linking.openURL(
                        "https://github.com/rajarsheechatterjee/shigoto/commits/master"
                    )
                }
            />
            <Divider />

            <List.Item
                title="Github"
                description="https://github.com/rajarsheechatterjee/shigoto"
                onPress={() =>
                    Linking.openURL(
                        "https://github.com/rajarsheechatterjee/shigoto"
                    )
                }
            />
        </List.Section>
    );
}
