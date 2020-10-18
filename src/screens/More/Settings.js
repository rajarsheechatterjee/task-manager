import React from "react";
import { Alert } from "react-native";
import { List, TouchableRipple, Divider } from "react-native-paper";

import Colors from "../../theming/colors";
import {
    deleteUser,
    addSampleData,
    currentUserEmail,
} from "../../utils/firebase";

export default function About({ navigation }) {
    const email = currentUserEmail();

    const handleDeleteUser = () => {
        deleteUser(navigation);
    };

    const deleteAccountAlert = () =>
        Alert.alert(
            "Warning",
            "Are you sure you want to permanently delete your account",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                { text: "Delete", onPress: () => handleDeleteUser() },
            ],
            { cancelable: false }
        );

    return (
        <List.Section
            style={{
                flex: 1,
                marginVertical: 0,
                backgroundColor: Colors.background,
            }}
        >
            <TouchableRipple>
                <List.Item
                    title="Delete all tasks"
                    description="(Not added yet)"
                    left={() => (
                        <List.Icon
                            color={Colors.deleteColor}
                            icon="trash-can-outline"
                        />
                    )}
                />
            </TouchableRipple>
            <TouchableRipple onPress={() => addSampleData(navigation)}>
                <List.Item
                    title="Add sample task"
                    left={() => (
                        <List.Icon
                            color={Colors.accentColor}
                            icon="playlist-plus"
                        />
                    )}
                />
            </TouchableRipple>
            <Divider />
            <List.Subheader
                style={{ color: Colors.accentColor, paddingBottom: 2 }}
            >
                Account Settings
            </List.Subheader>
            <TouchableRipple>
                <List.Item
                    title={email}
                    left={() => (
                        <List.Icon color={Colors.accentColor} icon="email" />
                    )}
                />
            </TouchableRipple>
            <TouchableRipple onPress={deleteAccountAlert} disabled>
                <List.Item
                    title="Delete your account"
                    description="(Not added yet)"
                    left={() => (
                        <List.Icon
                            color={Colors.deleteColor}
                            icon="account-remove"
                        />
                    )}
                />
            </TouchableRipple>
        </List.Section>
    );
}
