import React from "react";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import Colors from "../theming/colors";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { View, Text, StyleSheet, ToastAndroid } from "react-native";
import Menu, { MenuItem, MenuDivider } from "react-native-material-menu";
import { logout } from "../utils/firebase";
import Ripple from "react-native-material-ripple";

import TaskList from "../screens/TaskList/Tasks";
import TaskItem from "../screens/TaskItem";
import EditTask from "../screens/EditTask";

const Stack = createStackNavigator();

const CustomHeader = ({ navigation }) => {
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
            <Menu
                ref={setMenuRef}
                button={
                    <Text onPress={showMenu}>
                        <MaterialCommunityIcons
                            name="dots-vertical"
                            color="white"
                            size={24}
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
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    headerText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    rippleCont: {},
});

function StackNavigator({ navigation }) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Your Tasks"
                component={TaskList}
                options={{
                    headerStyle: {
                        backgroundColor: Colors.accentColor,
                    },
                    headerTintColor: "white",
                    headerLeft: false,
                    headerTitle: () => <CustomHeader navigation={navigation} />,
                }}
            />
            <Stack.Screen
                name="TaskItem"
                component={TaskItem}
                options={{
                    headerTitle: "Task Item",
                    headerStyle: {
                        backgroundColor: Colors.accentColor,
                    },
                    headerTintColor: "white",
                }}
            />
            <Stack.Screen
                name="EditTask"
                component={EditTask}
                options={{
                    headerTitle: "Edit Task Details",
                    headerStyle: {
                        backgroundColor: Colors.accentColor,
                    },
                    headerTintColor: "white",
                }}
            />
        </Stack.Navigator>
    );
}

export default StackNavigator;
