import React, { useState, useCallback } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    ActivityIndicator,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";

import Icon from "react-native-vector-icons/FontAwesome";
import Colors from "../theming/colors";

import { isLoggedIn, signupUser } from "../utils/firebase";

export default function SignupScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignup = () => {
        signupUser(email, password);
        setLoading(true);
        setTimeout(function () {
            setLoading(false);
        }, 3000);
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
                    <Text
                        style={styles.navigateText}
                        onPress={() => navigation.navigate("Login")}
                    >
                        Already have an account? Login
                    </Text>
                    <View
                        style={{
                            flex: 1,
                            flexDirection: "row",
                            justifyContent: "space-around",
                            padding: 10,
                            marginTop: 20,
                        }}
                    >
                        <ActivityIndicator
                            size="large"
                            color="white"
                            animating={loading}
                        />
                    </View>
                </ScrollView>
                <View style={styles.buttonWrapper}>
                    <TouchableHighlight
                        style={[{ opacity: 0.6 }, styles.button]}
                        onPress={handleSignup}
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
