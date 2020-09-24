import React from "react";
import { StyleSheet, View, Animated } from "react-native";
import Colors from "../../../theming/colors";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ripple from "react-native-material-ripple";

const AddTaskButton = ({ navigation }) => {
    return (
        <View style={styles.buttonWrapper}>
            <Ripple
                style={[styles.button, { backgroundColor: Colors.accentColor }]}
                rippleContainerBorderRadius={50}
                rippleDuration={300}
                onPress={() => navigation.navigate("Add New Task")}
            >
                <MaterialCommunityIcons
                    name="plus"
                    color="white"
                    size={32}
                    style={styles.icon}
                />
            </Ripple>
        </View>
    );
};

export default AddTaskButton;

const styles = StyleSheet.create({
    buttonWrapper: {
        position: "absolute",
        bottom: 20,
        right: 20,
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
        width: 60,
        height: 60,
        backgroundColor: "white",
    },
    icon: {
        marginRight: -2,
        marginTop: -2,
    },
});
