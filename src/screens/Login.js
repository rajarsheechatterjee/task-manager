import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    ToastAndroid,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import Colors from "../theming/colors";

import { checkIfLoggedIn, loginUser } from "../utils/firebase";

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        checkIfLoggedIn(navigation);
    }, [checkIfLoggedIn]);

    const handleLogin = () => {
        const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!re.test(email)) {
            ToastAndroid.showWithGravity(
                "Enter a valid email",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        } else if (password.length < 6) {
            ToastAndroid.showWithGravity(
                "Password should be of atleast 6 characters",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        } else {
            loginUser(email, password);
        }
    };

    return (
        <View style={styles.wrapper} behavior="padding">
            <View style={styles.scrollViewWrapper}>
                <ScrollView style={styles.avoidView}>
                    <Text style={styles.loginHeader}>Login</Text>
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
                    <Text
                        style={styles.navigateText}
                        onPress={() => navigation.navigate("Signup")}
                    >
                        Dont have an account? Create one
                    </Text>
                </ScrollView>
                <View style={styles.buttonWrapper}>
                    <TouchableHighlight
                        style={[{ opacity: 0.6 }, styles.button]}
                        onPress={handleLogin}
                    >
                        <Icon
                            name="angle-right"
                            color={Colors.accentColor}
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
        backgroundColor: Colors.accentColor,
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
