import React from "react";
import { Text, StyleSheet } from "react-native";
import Colors from "../theming/colors";

import Ripple from "react-native-material-ripple";

export default function Button({ onPress, title }) {
    return (
        <Ripple style={styles.button} onPress={() => onPress()}>
            <Text numberOfLines={1} style={styles.buttonTitle}>
                {title}
            </Text>
        </Ripple>
    );
}

const styles = StyleSheet.create({
    button: {
        elevation: 8,
        backgroundColor: Colors.accentColor,
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 13,
        marginVertical: 10,
    },
    buttonTitle: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",
    },
});
