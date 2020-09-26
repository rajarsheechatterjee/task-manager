import React from "react";
import { StyleSheet, View, Text, ToastAndroid } from "react-native";
import Colors from "../../../theming/colors";

// Firebase functions
import { logout } from "../../../utils/firebase";
import { Appbar } from "react-native-paper";
const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";
import { Button, Menu, Divider, Provider } from "react-native-paper";

import Ripple from "react-native-material-ripple";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Header = ({ navigation, handleSlider, handleSync }) => {
    const [visible, setVisible] = React.useState(false);

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);

    const handleToast = () => {
        ToastAndroid.show("Succesfully logged out", ToastAndroid.SHORT);
    };

    return (
        <Appbar.Header
            statusBarHeight={0}
            style={{ backgroundColor: Colors.accentColor }}
        >
            <Appbar.Content title="Your Tasks" />
            <Appbar.Action
                icon="filter-variant"
                onPress={() => handleSlider()}
            />
            <Appbar.Action icon="sync" onPress={() => handleSync()} />

            <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={
                    <Appbar.Action
                        icon={MORE_ICON}
                        onPress={openMenu}
                        color="white"
                    />
                }
            >
                <Menu.Item
                    onPress={() => {
                        closeMenu();
                        logout(navigation);
                        handleToast();
                    }}
                    title="Logout"
                />
                {/* <Menu.Item onPress={() => {}} title="Item 2" />
                <Menu.Item onPress={() => {}} title="Item 3" /> */}
            </Menu>
        </Appbar.Header>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        height: 56,
        backgroundColor: Colors.accentColor,
        padding: 15,
    },
    headerText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    filterContainer: {
        position: "absolute",
        right: 58,
        top: 10,
        padding: 5,
    },
    menuContainer: {
        position: "absolute",
        right: 10,
        top: 10,
        padding: 5,
    },
});

export default Header;
