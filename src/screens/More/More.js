import React from "react";
import { Appbar, List, TouchableRipple } from "react-native-paper";
import Colors from "../../theming/colors";

const MoreScreen = ({ navigation }) => {
    return (
        <>
            <Appbar.Header style={{ backgroundColor: Colors.accentColor }}>
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
                    backgroundColor: Colors.background,
                    marginTop: 0,
                    marginBottom: 0,
                }}
            >
                <List.Item
                    title="Settings"
                    left={() => (
                        <List.Icon
                            color={Colors.accentColor}
                            icon="settings-outline"
                        />
                    )}
                    onPress={() => navigation.navigate("Settings")}
                />
                <List.Item
                    title="About"
                    left={() => (
                        <List.Icon
                            color={Colors.accentColor}
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
