import React from "react";
import { List, TouchableRipple } from "react-native-paper";
import { Appbar } from "react-native-paper";
import Colors from "../../theming/colors";

export default function More({ navigation }) {
    return (
        <>
            <Appbar.Header style={{ backgroundColor: Colors.accentColor }}>
                <Appbar.Content title="More" />
            </Appbar.Header>
            <List.Section
                style={{
                    flex: 1,
                    backgroundColor: "#FAFAFA",
                    marginTop: 0,
                    marginBottom: 0,
                }}
            >
                <TouchableRipple
                    onPress={() => navigation.navigate("Settings")}
                    rippleColor="rgba(0, 0, 0, 0.2)"
                >
                    <List.Item
                        style={{ paddingVertical: 5 }}
                        title="Settings"
                        left={() => (
                            <List.Icon
                                color={Colors.accentColor}
                                icon="settings-outline"
                            />
                        )}
                    />
                </TouchableRipple>
                <TouchableRipple
                    onPress={() => navigation.navigate("About")}
                    rippleColor="rgba(0, 0, 0, 0.2)"
                >
                    <List.Item
                        style={{ paddingVertical: 5 }}
                        title="About"
                        left={() => (
                            <List.Icon
                                color={Colors.accentColor}
                                icon="information-outline"
                            />
                        )}
                    />
                </TouchableRipple>
            </List.Section>
        </>
    );
}
