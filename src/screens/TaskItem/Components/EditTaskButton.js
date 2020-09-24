import React from "react";
import { StyleSheet, View, TouchableHighlight } from "react-native";
import Colors from "../../../theming/colors";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ripple from "react-native-material-ripple";

const DeleteTaskButton = ({ navigation, taskItem }) => {
    return (
        <View style={styles.editTaskButton}>
            <TouchableHighlight
                style={[{ opacity: 1 }, styles.button]}
                onPress={() => navigation.navigate("EditTask", taskItem)}
                activeOpacity={0.6}
                underlayColor="#DDDDDD"
            >
                <MaterialCommunityIcons
                    name="pencil"
                    color={Colors.accentColor}
                    size={28}
                    style={styles.icon}
                />
            </TouchableHighlight>
        </View>
    );
};

export default DeleteTaskButton;

const styles = StyleSheet.create({
    editTaskButton: {
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
