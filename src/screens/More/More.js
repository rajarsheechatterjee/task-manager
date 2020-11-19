import React, { useContext } from "react";
import { Appbar, List } from "react-native-paper";

import { ThemeContext } from "../../navigation/ThemeProvider";

const MoreScreen = ({ navigation }) => {
    const { theme } = useContext(ThemeContext);

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
                <Appbar.Content title="More" />
            </Appbar.Header>
            <List.Section
                style={{
                    flex: 1,
                    backgroundColor: theme.backgroundColor,
                    marginTop: 0,
                    marginBottom: 0,
                }}
            >
                <List.Item
                    titleStyle={{ color: theme.textColor }}
                    title="Settings"
                    left={() => (
                        <List.Icon
                            color={theme.colorAccentSecondary}
                            icon="settings-outline"
                        />
                    )}
                    onPress={() => navigation.navigate("Settings")}
                />
                <List.Item
                    titleStyle={{ color: theme.textColor }}
                    title="About"
                    left={() => (
                        <List.Icon
                            color={theme.colorAccentSecondary}
                            icon="information-outline"
                        />
                    )}
                    onPress={() => navigation.navigate("About")}
                />
            </List.Section>
        </>
    );
};

export default MoreScreen;
