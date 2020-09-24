import React from "react";
import { StyleSheet, View, Animated } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Colors from "../../../theming/colors";
import Ripple from "react-native-material-ripple";

const SyncButton = ({ handleSync, menuToggled }) => {
    const logoStyles = [styles.logoStyle];

    if (menuToggled !== null) {
        const animation = new Animated.Value(menuToggled ? 0 : 1);

        Animated.timing(animation, {
            toValue: menuToggled ? 1 : 0,
            duration: 200,
            useNativeDriver: true,
        }).start();

        const rotateInterpolate = animation.interpolate({
            inputRange: [0, 1],
            outputRange: ["0deg", "360deg"],
        });
        const animatedStyles = { transform: [{ rotate: rotateInterpolate }] };
        logoStyles.push(animatedStyles);
    }
    return (
        <View style={styles.buttonWrapper}>
            <Ripple
                style={[styles.button]}
                rippleContainerBorderRadius={50}
                rippleDuration={300}
                onPress={handleSync}
            >
                <Animated.View style={logoStyles}>
                    <MaterialCommunityIcons
                        name="cached"
                        color={Colors.accentColor}
                        size={32}
                        style={styles.icon}
                    />
                </Animated.View>
            </Ripple>
        </View>
    );
};

export default SyncButton;

const styles = StyleSheet.create({
    buttonWrapper: {
        position: "absolute",
        bottom: 20,
        left: 20,
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
        width: 60,
        height: 60,
        backgroundColor: "white",
        opacity: 0.8,
    },
    icon: {
        marginRight: -2,
        marginTop: -2,
    },
});
