import React, { useState, useCallback } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    ActivityIndicator,
} from "react-native";
import Colors from "../theming/colors";
import { useFocusEffect } from "@react-navigation/native";
import { loadUser } from "../utils/firebase";

export default function Loading({ navigation }) {
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
            loadUser(navigation);
        }, [])
    );

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Checking if logged in</Text>
            <ActivityIndicator size="large" color="white" animating={loading} />
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
