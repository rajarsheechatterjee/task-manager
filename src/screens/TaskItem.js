import React from "react";
import { Text, View, StyleSheet, TouchableHighlight } from "react-native";

import { deleteTask } from "../utils/firebase";

import moment from "moment";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function TaskItem({ route, navigation }) {
    const taskItem = route.params;

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.mainContainer}>
                <View
                    style={{
                        borderBottomWidth: 1,
                        borderBottomColor: "#E8E8E8",
                    }}
                >
                    <Text style={styles.taskTitle}>
                        {taskItem.taskTitle}{" "}
                        {taskItem.isCompleted && (
                            <MaterialCommunityIcons
                                name="checkbox-marked-circle"
                                color="green"
                                size={25}
                                style={{ paddingTop: 15 }}
                            />
                        )}
                    </Text>
                </View>
                <View>
                    <Text style={styles.taskDate}>
                        {moment(taskItem.createdAt.toDate()).calendar()}
                    </Text>
                </View>
                <View>
                    <Text style={styles.taskContent}>
                        {taskItem.taskContent}
                    </Text>
                </View>
            </View>
            <View style={styles.buttonWrapper}>
                <TouchableHighlight
                    style={[{ opacity: 1 }, styles.button]}
                    onPress={() => navigation.navigate("EditTask", taskItem)}
                    activeOpacity={0.6}
                    underlayColor="#DDDDDD"
                >
                    <MaterialCommunityIcons
                        name="pencil"
                        color="#118086"
                        size={28}
                        style={styles.icon}
                    />
                </TouchableHighlight>
            </View>
            <View style={styles.buttonWrapper2}>
                <TouchableHighlight
                    style={[{ opacity: 1 }, styles.button]}
                    onPress={() => deleteTask(navigation, taskItem.id)}
                    activeOpacity={0.6}
                    underlayColor="#DDDDDD"
                >
                    <MaterialCommunityIcons
                        name="trash-can-outline"
                        color="#E53935"
                        size={28}
                        style={styles.icon}
                    />
                </TouchableHighlight>
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
    taskTitle: { fontWeight: "700", fontSize: 36, paddingVertical: 5 },
    taskDate: {
        paddingVertical: 10,
        fontSize: 14,
        color: "#767676",
    },
    taskContent: {
        fontSize: 18,
        lineHeight: 29,
    },
    buttonWrapper: {
        position: "absolute",
        bottom: 20,
        right: 20,
    },
    buttonWrapper2: {
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
    },
    icon: {
        marginRight: -2,
        marginTop: -2,
    },
});
