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

export default function TaskItem({ route }) {
    const item = route.params;
    return (
        <View>
            <Text>{item.taskTitle}</Text>
        </View>
    );
}
