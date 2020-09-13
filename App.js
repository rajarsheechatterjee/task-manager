import { StatusBar } from "expo-status-bar";
import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableOpacity,
} from "react-native";

import Firebase from "./firebase";

export default function App() {
    return (
        <View style={styles.container}>
            <Text>Login</Text>
            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                style={{
                    height: 40,
                    width: "90%",
                    borderColor: "gray",
                    borderWidth: 1,
                    borderRadius: 10,
                    margin: 10,
                    padding: 5,
                }}
            />
            <TextInput
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
                style={{
                    height: 40,
                    width: "90%",
                    borderColor: "gray",
                    borderWidth: 1,
                    borderRadius: 10,
                    margin: 10,
                    padding: 5,
                }}
            />
            <View style={{}}>
                <Button title="submit " color="purple" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
    },
});
