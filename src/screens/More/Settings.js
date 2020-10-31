import React, { useContext, useState } from "react";
import { Alert } from "react-native";
import { List, Divider, Appbar, Checkbox } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    deleteUser,
    addSampleData,
    currentUserEmail,
    logout,
} from "../../utils/firebase";

import { ThemeContext } from "../../navigation/ThemeProvider";

const SettingsScreen = ({ navigation }) => {
    const { toggleDarkMode, theme } = useContext(ThemeContext);

    const [checked, setChecked] = useState();

    AsyncStorage.getItem("@theme").then((value) =>
        setChecked(JSON.parse(value))
    );

    const handleCheckbox = () => {
        toggleDarkMode();
        setChecked(!checked);
    };

    const email = currentUserEmail();

    // const handleDeleteUser = () => {
    //     deleteUser(navigation);
    // };

    // const deleteAccountAlert = () =>
    //     Alert.alert(
    //         "Warning",
    //         "Are you sure you want to permanently delete your account",
    //         [
    //             {
    //                 text: "Cancel",
    //                 style: "cancel",
    //             },
    //             { text: "Delete", onPress: () => handleDeleteUser() },
    //         ],
    //         { cancelable: false }
    //     );

    return (
        <>
            <Appbar.Header style={{ backgroundColor: theme.accentColor }}>
                <Appbar.BackAction
                    onPress={() => {
                        navigation.goBack();
                    }}
                />
                <Appbar.Content title="Settings" />
            </Appbar.Header>
            <List.Section
                style={{
                    flex: 1,
                    marginVertical: 0,
                    backgroundColor: theme.background,
                }}
            >
                <List.Subheader
                    style={{
                        color: theme.secondaryAccentColor,
                        paddingTop: 20,
                        paddingBottom: 5,
                    }}
                >
                    General
                </List.Subheader>
                <List.Item
                    title="Clear all tasks"
                    titleStyle={{ color: theme.textColor }}
                    descriptionStyle={{ color: theme.subTextColor }}
                    description="(Not added yet)"
                    right={() => (
                        <List.Icon
                            color={theme.secondaryAccentColor}
                            icon="trash-can-outline"
                        />
                    )}
                />
                <List.Item
                    style={{ paddingVertical: 0 }}
                    title="Add sample task"
                    titleStyle={{ color: theme.textColor }}
                    right={() => (
                        <List.Icon
                            color={theme.secondaryAccentColor}
                            icon="playlist-plus"
                        />
                    )}
                    onPress={() => addSampleData(navigation)}
                />
                <Divider />
                <List.Subheader
                    style={{
                        color: theme.secondaryAccentColor,
                        paddingTop: 20,
                        paddingBottom: 5,
                    }}
                >
                    Theme
                </List.Subheader>
                <List.Item
                    titleStyle={{ color: theme.textColor }}
                    title="Dark Theme"
                    onPress={() => handleCheckbox()}
                    right={() => (
                        <Checkbox
                            status={checked ? "checked" : "unchecked"}
                            onPress={() => handleCheckbox()}
                            color={theme.secondaryAccentColor}
                        />
                    )}
                    style={{ paddingRight: 20 }}
                />
                <Divider />
                <List.Subheader
                    style={{
                        color: theme.secondaryAccentColor,
                        paddingTop: 20,
                        paddingBottom: 5,
                    }}
                >
                    Account
                </List.Subheader>
                <List.Item
                    style={{ paddingVertical: 0 }}
                    title={email}
                    titleStyle={{ color: theme.textColor }}
                    right={() => (
                        <List.Icon
                            color={theme.secondaryAccentColor}
                            icon="email"
                        />
                    )}
                />
                <List.Item
                    style={{ paddingVertical: 0 }}
                    title="Logout"
                    titleStyle={{ color: theme.textColor }}
                    right={() => (
                        <List.Icon
                            color={theme.secondaryAccentColor}
                            icon="logout-variant"
                        />
                    )}
                    onPress={() => logout()}
                />
                {/* <List.Item
                title="Reset your password"
                description="(Not added yet)"
                right={() => (
                    <List.Icon
                        color={theme.accentColor}
                        icon="textbox-password"
                    />
                )}
                onPress={deleteAccountAlert}
                disabled
            />
            <List.Item
                title="Delete your account"
                description="(Not added yet)"
                right={() => (
                    <List.Icon
                        color={theme.deleteColor}
                        icon="account-remove"
                    />
                )}
                onPress={deleteAccountAlert}
                disabled
            /> */}
            </List.Section>
        </>
    );
};

export default SettingsScreen;
