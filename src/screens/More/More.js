import React, { useContext } from "react";
import { Appbar, List } from "react-native-paper";
import Colors from "../../theming/colors";

import { ThemeContext } from "../../navigation/ThemeProvider";

const MoreScreen = ({ navigation }) => {
    const { toggleDarkMode, theme } = useContext(ThemeContext);

    return (
        <>
            <Appbar.Header style={{ backgroundColor: theme.accentColor }}>
                <Appbar.BackAction
                    onPress={() => {
                        navigation.goBack();
                    }}
                />
                <Appbar.Content title="More" />
            </Appbar.Header>
            <List.Section
                style={{
                    flex: 1,
                    backgroundColor: theme.background,
                    marginTop: 0,
                    marginBottom: 0,
                }}
            >
                <List.Item
                    title="Settings"
                    left={() => (
                        <List.Icon
                            color={theme.accentColor}
                            icon="settings-outline"
                        />
                    )}
                    onPress={() => navigation.navigate("Settings")}
                />
                <List.Item
                    title="About"
                    left={() => (
                        <List.Icon
                            color={theme.accentColor}
                            icon="information-outline"
                        />
                    )}
                    onPress={() => navigation.navigate("About")}
                />
                <List.Item
                    title="Dark Theme"
                    onPress={() => toggleDarkMode()}
                />
            </List.Section>
        </>
    );
};

export default MoreScreen;
