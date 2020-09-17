import React from "react";
import { Text, View } from "react-native";
import moment from "moment";

export default function TaskItem({ route }) {
    const { taskTitle, taskTime, taskContent, createdAt } = route.params;
    return (
        <View>
            <Text>{taskTitle}</Text>
            <Text> {moment(createdAt.toDate()).calendar()}</Text>
            <Text>{taskContent}</Text>
        </View>
    );
}
