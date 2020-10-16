import React, { useState } from "react";
import { ToastAndroid } from "react-native";

import { logout } from "../../../utils/firebase";

import Colors from "../../../theming/colors";
import { Appbar, Menu } from "react-native-paper";

const Header = ({ navigation, handleSlider, handleSync }) => {
    // Menu
    const [visible, setVisible] = useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    return (
        <Appbar.Header style={{ backgroundColor: Colors.accentColor }}>
            <Appbar.Content title="Your Tasks" />
            <Appbar.Action icon="sync" onPress={() => handleSync()} />
            <Appbar.Action
                icon="filter-variant"
                onPress={() => handleSlider()}
            />
            <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={
                    <Appbar.Action
                        icon="dots-vertical"
                        onPress={openMenu}
                        color={Colors.iconColor}
                    />
                }
            >
                <Menu.Item
                    onPress={() => {
                        closeMenu();
                        logout(navigation);
                        ToastAndroid.show(
                            "Succesfully logged out",
                            ToastAndroid.SHORT
                        );
                    }}
                    title="Logout"
                />
                {/* <Menu.Item onPress={() => {}} title="Item 2" /> */}
            </Menu>
        </Appbar.Header>
    );
};

export default Header;
