import React from "react";
import { StyleSheet, View, Text, ToastAndroid } from "react-native";
import Menu, { MenuItem, MenuDivider } from "react-native-material-menu";
import { logout } from "../utils/firebase";
import Colors from "../../../theming/colors";
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
            <View style={{ flexDirection: "row" }}>
                <MaterialCommunityIcons
                    name="filter-variant"
                    color="white"
                    size={25}
                    style={{ marginRight: 21 }}
                    onPress={handleSlider}
                />
                <Menu
                    ref={setMenuRef}
                    button={
                        <Text onPress={showMenu}>
                            <MaterialCommunityIcons
                                name="dots-vertical"
                                color="white"
                                size={25}
                            />
                        </Text>
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
            </View>
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
});

export default Header;
