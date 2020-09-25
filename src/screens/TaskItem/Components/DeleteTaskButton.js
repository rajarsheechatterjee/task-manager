import React from "react";
import { StyleSheet, View, TouchableHighlight } from "react-native";
import Colors from "../../../theming/colors";

// Firebase functions
import { deleteTask } from "../../../utils/firebase";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ripple from "react-native-material-ripple";

const DeleteTaskButton = ({ navigation, taskId }) => {
    return (
        <View style={styles.deleteButtonWrapper}>
            <TouchableHighlight
                style={[{ opacity: 1 }, styles.button]}
                onPress={() => deleteTask(navigation, taskId)}
                activeOpacity={0.6}
                underlayColor="#DDDDDD"
            >
                <MaterialCommunityIcons
                    name="trash-can-outline"
                    color="#E53935"
                    size={28}
                    style={styles.icon}
                />
            </TouchableHighlight>
        </View>
    );
};

export default DeleteTaskButton;

const styles = StyleSheet.create({
    deleteButtonWrapper: {
        position: "absolute",
        bottom: 20,
        left: 20,
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
