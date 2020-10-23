import React, { useCallback } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { loadUser } from "../utils/firebase";
import Colors from "../theming/colors";

export default function Loading({ navigation }) {
    useFocusEffect(
        useCallback(() => {
            loadUser(navigation);
        }, [])
    );

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Checking if logged in</Text>
            <ActivityIndicator size="large" color="white" animating={true} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.accentColor,
        alignItems: "center",
        justifyContent: "center",
    },
    titleText: {
        color: "white",
        fontSize: 18,
        marginBottom: 20,
    },
});
