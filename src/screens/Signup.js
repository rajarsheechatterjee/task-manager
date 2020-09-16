import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableOpacity,
    KeyboardAvoidingView,
    TouchableHighlight,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";

import firebase from "../../firebase";

export default function LoginScreen({ navigation }) {
    const [loggedIn, setIsLoggedIn] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const checkIfLoggenIn = () => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                setIsLoggedIn(true);
                navigation.navigate("Task Monitor");
            }
        });
    };

    useEffect(() => {
        checkIfLoggenIn();
    }, [checkIfLoggenIn]);

    const signupUser = async (email, password) => {
        try {
            await firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(() => {
                    const userUid = firebase.auth().currentUser.uid;

                    firebase.firestore().collection("users").doc(userUid).set({
                        email: email,
                    });
                });
        } catch (error) {
            console.log(error.toString());
        }
    };

    const loginUser = async (email, password) => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
        } catch (error) {
            console.log(error.toString());
        }
    };

    return (
        <View style={styles.wrapper} behavior="padding">
            <View style={styles.scrollViewWrapper}>
                <ScrollView style={styles.avoidView}>
                    <Text style={styles.loginHeader}>Sign Up</Text>
                    <Text style={styles.labelText}>E-mail</Text>
                    <TextInput
                        textContentType="emailAddress"
                        style={{
                            color: "white",
                            borderBottomColor: "white",
                            borderBottomWidth: 1,
                            paddingTop: 5,
                            paddingBottom: 5,
                            marginBottom: 30,
                        }}
                        onChangeText={(email) => setEmail(email)}
                    />
                    <Text style={styles.labelText}>Password</Text>
                    <TextInput
                        secureTextEntry={true}
                        style={{
                            color: "white",
                            borderBottomColor: "white",
                            borderBottomWidth: 1,
                            paddingTop: 5,
                            paddingBottom: 5,
                            marginBottom: 30,
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
                    <Text
                        style={styles.navigateText}
                        onPress={() => navigation.navigate("Login")}
                    >
                        Already have an account? Login
                    </Text>
                </ScrollView>
                <View style={styles.buttonWrapper}>
                    <TouchableHighlight
                        style={[{ opacity: 0.6 }, styles.button]}
                    >
                        <Icon
                            name="angle-right"
                            color="#118086"
                            size={32}
                            style={styles.icon}
                        />
                    </TouchableHighlight>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        display: "flex",
        flex: 1,
        backgroundColor: "#118086",
    },
    scrollViewWrapper: {
        marginTop: 70,
        flex: 1,
    },
    avoidView: {
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 20,
        flex: 1,
    },
    loginHeader: {
        fontSize: 28,
        color: "white",
        fontWeight: "300",
        marginBottom: 40,
    },
    labelText: {
        fontWeight: "700",
        marginBottom: 10,
        fontSize: 14,
        color: "white",
    },
    buttonWrapper: {
        alignItems: "flex-end",
        right: 20,
        bottom: 20,
        paddingTop: 0,
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
    navigateText: {
        color: "white",
        fontSize: 15,
        textAlign: "center",
    },
});
