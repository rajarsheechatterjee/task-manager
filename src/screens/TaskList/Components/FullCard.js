import React, { useState, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableRipple } from "react-native-paper";

import moment from "moment";
import { priorityColor } from "../../../utils/priority";

import { ThemeContext } from "../../../navigation/ThemeProvider";
import { color } from "react-native-reanimated";

export default function TaskCard({
    taskItem,
    navigation,
    updateCompleted,
    onToggleSnackBar,
    handleSetTaskId,
    onDismissSnackBar,
}) {
    const { theme } = useContext(ThemeContext);

    const { taskTitle, taskTime, taskContent, priorityIs } = taskItem;

    const [checked, setChecked] = useState(taskItem.isCompleted);

    const handleCompleted = () => {
        setChecked(!checked);
        updateCompleted(checked, taskItem.id);
        if (!checked) {
            onToggleSnackBar();
            handleSetTaskId(taskItem.id);
        } else {
            onDismissSnackBar();
        }
    };
    return (
        <View style={styles.mainContainer}>
            <TouchableRipple
                borderless
                centered
                style={[
                    styles.taskListContainer,
                    { backgroundColor: theme.cardBackground },
                ]}
                onPress={() => navigation.navigate("Task Item", taskItem)}
                onLongPress={() => {
                    handleCompleted();
                }}
            >
                <View style={styles.taskListView}>
                    <Text
                        style={[
                            styles.taskItemTitle,
                            { color: theme.textColor },
                            checked && {
                                textDecorationLine: "line-through",
                            },
                            taskContent === "" && {
                                paddingBottom: 10,
                            },
                            taskTime !== "" && {
                                paddingBottom: 0,
                            },
                        ]}
                        numberOfLines={1}
                    >
                        {taskTitle + "  "}
                        <View
                            style={[
                                priorityColor(priorityIs),
                                {
                                    height: 10,
                                    width: 10,
                                    borderRadius: 50,
                                },
                            ]}
                        />
                    </Text>
                    {taskTime !== "" && (
                        <Text
                            style={[
                                styles.taskItemDate,
                                checked && {
                                    textDecorationLine: "line-through",
                                },
                            ]}
                            numberOfLines={1}
                        >
                            {"Due " + moment(taskTime.toDate()).calendar()}
                        </Text>
                    )}
                    {taskContent !== "" && (
                        <Text
                            style={[
                                styles.taskContent,
                                checked && {
                                    textDecorationLine: "line-through",
                                },
                                { color: theme.subTextColor },
                            ]}
                        >
                            {taskContent}
                        </Text>
                    )}
                </View>
            </TouchableRipple>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        marginVertical: 5,
        marginHorizontal: 7,
    },
    taskListContainer: {
        borderRadius: 15,
        elevation: 2,
    },
    taskListView: {
        flex: 1,
        paddingVertical: 9,
    },
    taskItemTitle: {
        paddingTop: 10,
        paddingHorizontal: 20,
        fontSize: 18,
        fontWeight: "bold",
    },
    taskItemDate: {
        marginBottom: 5,
        paddingHorizontal: 20,
        fontSize: 14,
        color: "#767676",
    },
    taskContent: {
        marginBottom: 10,
        paddingHorizontal: 20,
        fontSize: 14,
        color: "#484848",
        lineHeight: 20,
    },
    priorityMarker: {
        position: "absolute",
        left: 65,
        top: 17,
    },

    rightChevronContainer: {
        position: "absolute",
        right: 25,
        top: 10,
    },
    rightChevron: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
        width: 60,
        height: 60,
    },
    icon: {
        marginRight: -2,
        marginTop: -2,
    },
    checkbox: {
        position: "absolute",
        left: 8,
        top: 14,
    },

    taskPriority: {
        marginTop: 5,
        width: 4,
        height: 40,
        borderRadius: 9999,
        borderWidth: 1,
    },
    checkBoxStyle: {
        borderRadius: 10,
        backgroundColor: "transparent",
        borderWidth: 0,
    },
});
