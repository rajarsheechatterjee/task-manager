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
    const signOut = async () => {
        await firebase.auth().signOut();
    };

    return (
        <View>
            <Text>Home</Text>
            <Button title="Sign Out" onPress={() => signOut()} />
        </View>
    );
}
