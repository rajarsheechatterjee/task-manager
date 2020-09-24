import React from "react";
import { StyleSheet, View, Text, ToastAndroid } from "react-native";
import Menu, { MenuItem, MenuDivider } from "react-native-material-menu";
import { logout } from "../utils/firebase";
import Colors from "../../../theming/colors";
import Ripple from "react-native-material-ripple";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Header = ({ navigation, handleSlider }) => {
    _menu = null;

    setMenuRef = (ref) => {
        _menu = ref;
    };

    hideMenu = () => {
        _menu.hide();
    };

    showMenu = () => {
        _menu.show();
    };

    const handleToast = () => {
        ToastAndroid.show("Succesfully logged out", ToastAndroid.SHORT);
    };

    return (
        <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Your Tasks</Text>
            <Ripple
                onPress={handleSlider}
                style={styles.filterContainer}
                rippleContainerBorderRadius={50}
                rippleCentered={true}
            >
                <MaterialCommunityIcons
                    name="filter-variant"
                    color="white"
                    size={28}
                />
            </Ripple>
            <Ripple
                onPress={showMenu}
                rippleContainerBorderRadius={50}
                style={styles.menuContainer}
                rippleCentered={true}
            >
                <Menu
                    ref={setMenuRef}
                    button={
                        <MaterialCommunityIcons
                            name="dots-vertical"
                            color="white"
                            size={28}
                        />
                    }
                >
                    <MenuItem
                        onPress={() => {
                            hideMenu();
                            logout(navigation);
                            handleToast();
                        }}
                    >
                        Logout
                    </MenuItem>
                </Menu>
            </Ripple>
        </View>
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
