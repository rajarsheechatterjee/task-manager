import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import Colors from "../theming/colors";

export default function Spinner() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={Colors.accentColor} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
