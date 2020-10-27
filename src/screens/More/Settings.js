import React from "react";
import { Alert } from "react-native";
import { List, Divider, Appbar } from "react-native-paper";

import Colors from "../../theming/colors";
import {
    deleteUser,
    addSampleData,
    currentUserEmail,
    logout,
} from "../../utils/firebase";

const SettingsScreen = ({ navigation }) => {
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
            <Appbar.Header style={{ backgroundColor: Colors.accentColor }}>
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
                    backgroundColor: Colors.background,
                }}
            >
                <List.Item
                    title="Clear all tasks"
                    description="(Not added yet)"
                    left={() => (
                        <List.Icon
                            color={Colors.deleteColor}
                            icon="trash-can-outline"
                        />
                    )}
                />
                <List.Item
                    style={{ paddingVertical: 0 }}
                    title="Add sample task"
                    left={() => (
                        <List.Icon
                            color={Colors.accentColor}
                            icon="playlist-plus"
                        />
                    )}
                    onPress={() => addSampleData(navigation)}
                />
                <Divider />
                <List.Subheader
                    style={{
                        color: Colors.accentColor,
                        paddingTop: 20,
                        paddingBottom: 5,
                    }}
                >
                    Account Settings
                </List.Subheader>
                <List.Item
                    style={{ paddingVertical: 0 }}
                    title={email}
                    left={() => (
                        <List.Icon color={Colors.accentColor} icon="email" />
                    )}
                />
                <List.Item
                    style={{ paddingVertical: 0 }}
                    title="Logout"
                    left={() => (
                        <List.Icon
                            color={Colors.accentColor}
                            icon="logout-variant"
                        />
                    )}
                    onPress={() => logout()}
                />
                {/* <List.Item
                title="Reset your password"
                description="(Not added yet)"
                left={() => (
                    <List.Icon
                        color={Colors.accentColor}
                        icon="textbox-password"
                    />
                )}
                onPress={deleteAccountAlert}
                disabled
            />
            <List.Item
                title="Delete your account"
                description="(Not added yet)"
                left={() => (
                    <List.Icon
                        color={Colors.deleteColor}
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
