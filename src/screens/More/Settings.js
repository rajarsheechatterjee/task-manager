import React, { useContext, useState } from "react";
import { List, Divider, Appbar, Checkbox } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addSampleData, currentUserEmail, logout } from "../../utils/firebase";

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
                <Appbar.Content title="Settings" />
            </Appbar.Header>
            <List.Section
                style={{
                    flex: 1,
                    marginVertical: 0,
                    backgroundColor: theme.backgroundColor,
                }}
            >
                <List.Subheader
                    style={{
                        color: theme.colorAccentSecondary,
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
                            color={theme.colorAccentSecondary}
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
                            color={theme.colorAccentSecondary}
                            icon="playlist-plus"
                        />
                    )}
                    onPress={() => addSampleData(navigation)}
                />
                <Divider />
                <List.Subheader
                    style={{
                        color: theme.colorAccentSecondary,
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
                            color={theme.colorAccentSecondary}
                        />
                    )}
                    style={{ paddingRight: 20 }}
                />
                <Divider />
                <List.Subheader
                    style={{
                        color: theme.colorAccentSecondary,
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
                            color={theme.colorAccentSecondary}
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
                            color={theme.colorAccentSecondary}
                            icon="logout-variant"
                        />
                    )}
                    onPress={() => logout()}
                />
            </List.Section>
        </>
    );
};

export default SettingsScreen;
