import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableOpacity,
} from "react-native";

import firebase from "../../firebase";

export default function Home({ navigation }) {
    async function logout() {
        await firebase.auth().signOut();
        navigation.navigate("Login");
    }

    return (
        <View>
            <Text>Home</Text>
            <Button title="Sign Out" onPress={() => logout()} />
        </View>
    );
}
