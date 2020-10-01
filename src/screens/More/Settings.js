import React, { useState } from "react";
import { View, Text, Clipboard, ToastAndroid, Alert } from "react-native";
import { List, TouchableRipple, Divider } from "react-native-paper";
import Colors from "../../theming/colors";
import { deleteUser, addDummyData } from "../../utils/firebase";

export default function About({ navigation }) {
    const handleDeleteUser = async () => {
        deleteUser(navigation);
    };

    const createTwoButtonAlert = () =>
        Alert.alert(
            "Delete your account",
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
                backgroundColor: "#FAFAFA",
            }}
        >
            <TouchableRipple onPress={() => console.log("XDd")}>
                <List.Item
                    title="Delete all tasks"
                    description="Clear all tasks from cloud storage"
                    left={() => (
                        <List.Icon color="#E53935" icon="trash-can-outline" />
                    )}
                />
            </TouchableRipple>
            <TouchableRipple onPress={() => addDummyData(navigation)}>
                <List.Item
                    title="Add dummy data"
                    description="Test using dummy data"
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
            <TouchableRipple onPress={createTwoButtonAlert}>
                <List.Item
                    style={{ paddingVertical: 5 }}
                    title="Delete your account"
                    description="Permanently remove your account"
                    left={() => (
                        <List.Icon color="#E53935" icon="account-remove" />
                    )}
                />
            </TouchableRipple>
        </List.Section>
    );
}
