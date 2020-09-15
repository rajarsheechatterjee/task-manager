import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableOpacity,
} from "react-native";

import firebase from "../../firebase";

export default function LoginScreen({ navigation }) {
    const [loggedIn, setIsLoggedIn] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const checkIfLoggenIn = () => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                setIsLoggedIn(true);
                navigation.navigate("Home");
            }
        });
    };

    useEffect(() => {
        checkIfLoggenIn();
    }, [checkIfLoggenIn]);

    const signupUser = (email, password) => {
        try {
            firebase.auth().createUserWithEmailAndPassword(email, password);
        } catch (error) {
            console.log(error.toString());
        }
    };

    const loginUser = (email, password) => {
        try {
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then((user) => console.log(user));
        } catch (error) {
            console.log(error.toString());
        }
    };

    return (
        <View style={styles.container}>
            <Text>Sign Up</Text>
            <TextInput
                textContentType="emailAddress"
                style={{
                    height: 40,
                    width: "90%",
                    borderColor: "gray",
                    borderWidth: 1,
                    borderRadius: 10,
                    margin: 10,
                    padding: 5,
                }}
                onChangeText={(email) => setEmail(email)}
            />
            <TextInput
                secureTextEntry={true}
                style={{
                    height: 40,
                    width: "90%",
                    borderColor: "gray",
                    borderWidth: 1,
                    borderRadius: 10,
                    margin: 10,
                    padding: 5,
                }}
                onChangeText={(password) => setPassword(password)}
            />
            <Button
                title="Sign up "
                color="purple"
                onPress={() => signupUser(email, password)}
            />
            <Button
                title="Login "
                color="coral"
                onPress={() => loginUser(email, password)}
            />
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
