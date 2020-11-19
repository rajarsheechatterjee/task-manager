import React, { useContext } from "react";
import { Clipboard, ToastAndroid, Alert } from "react-native";
import { List, Divider, Appbar } from "react-native-paper";
import * as Linking from "expo-linking";
import * as Updates from "expo-updates";
import { ThemeContext } from "../../navigation/ThemeProvider";

const AboutScreen = ({ navigation }) => {
    const { theme } = useContext(ThemeContext);

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
        Clipboard.setString("Version: Stable 0.3.6");
        ToastAndroid.show(
            "Copied to clipboard: Version: Stable 0.3.6",
            ToastAndroid.SHORT
        );
    };

    return (
        <>
            <Appbar.Header
                style={{ backgroundColor: theme.colorAccentPrimary }}
            >
                <Appbar.BackAction
                    onPress={() => {
                        navigation.goBack();
                    }}
                />
                <Appbar.Content title="About" />
            </Appbar.Header>
            <List.Section
                style={{
                    flex: 1,
                    marginTop: 0,
                    backgroundColor: theme.backgroundColor,
                    marginBottom: 0,
                }}
            >
                <List.Item
                    titleStyle={{ color: theme.textColor }}
                    title="Version"
                    descriptionStyle={{ color: theme.subTextColor }}
                    description="Stable 0.3.6"
                    onPress={handleCopyVersion}
                />
                <List.Item
                    titleStyle={{ color: theme.textColor }}
                    title="Build Time"
                    descriptionStyle={{ color: theme.subTextColor }}
                    description="10/11/20  9:00 PM"
                />
                <List.Item
                    titleStyle={{ color: theme.textColor }}
                    title="Check for updates"
                    onPress={checkForUpdates}
                />
                <List.Item
                    titleStyle={{ color: theme.textColor }}
                    title="What's new"
                    onPress={() =>
                        Linking.openURL(
                            "https://github.com/rajarsheechatterjee/shigoto/commits/master"
                        )
                    }
                />
                <Divider />

                <List.Item
                    titleStyle={{ color: theme.textColor }}
                    descriptionStyle={{ color: theme.subTextColor }}
                    title="Github"
                    description="https://github.com/rajarsheechatterjee/shigoto"
                    onPress={() =>
                        Linking.openURL(
                            "https://github.com/rajarsheechatterjee/shigoto"
                        )
                    }
                />
            </List.Section>
        </>
    );
};

export default AboutScreen;
