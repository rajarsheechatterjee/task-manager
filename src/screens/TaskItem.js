import React from "react";
import { Text, View, StyleSheet } from "react-native";
import moment from "moment";

export default function TaskItem({ route }) {
    const { taskTitle, taskTime, taskContent, createdAt } = route.params;
    return (
        <View style={styles.mainContainer}>
            <View
                style={{ borderBottomWidth: 1, borderBottomColor: "#E8E8E8" }}
            >
                <Text style={styles.taskTitle}>{taskTitle}</Text>
            </View>
            <View>
                <Text style={styles.taskDate}>
                    {moment(createdAt.toDate()).calendar()}
                </Text>
            </View>
            <View>
                <Text style={styles.taskContent}>{taskContent}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        marginTop: 20,
        margin: 10,
        padding: 20,
        elevation: 1,
        paddingTop: 15,
        borderRadius: 15,
        backgroundColor: "white",
        color: "#484848",
    },
    taskTitle: { fontWeight: "700", fontSize: 40, paddingVertical: 5 },
    taskDate: {
        paddingVertical: 10,
        fontSize: 14,
        color: "#767676",
    },
    taskContent: {
        fontSize: 18,
        lineHeight: 29,
    },
});
