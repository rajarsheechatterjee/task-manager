import React from "react";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { StyleSheet, View, Text } from "react-native";
import Menu, { MenuItem, MenuDivider } from "react-native-material-menu";

import AddTasks from "../screens/AddTask";

const Stack = createStackNavigator();

export default function StackNavigator({ navigation }) {
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

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Add New Task"
                component={AddTasks}
                options={{
                    headerStyle: {
                        backgroundColor: "#118086",
                    },
                    headerTintColor: "white",
                    headerLeft: false,
                    headerRight: () => (
                        <View style={styles.icon}>
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
                                <MenuItem onPress={hideMenu}>
                                    {/* <MaterialCommunityIcons
                                        name="logout-variant"
                                        size={15}
                                    /> */}
                                    Logout
                                </MenuItem>
                            </Menu>
                        </View>
                    ),
                }}
            />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    icon: {
        marginRight: 16,
    },
});
