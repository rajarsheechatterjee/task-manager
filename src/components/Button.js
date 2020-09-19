import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Button({ onPress, title }) {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            style={styles.button}
            onPress={() => onPress()}
        >
            <Text numberOfLines={1} style={styles.buttonTitle}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        elevation: 8,
        backgroundColor: "#118086",
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
