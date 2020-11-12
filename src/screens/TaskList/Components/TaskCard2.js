import React, { useState, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { CheckBox } from "react-native-elements";

import { priorityColor } from "../../../utils/priority";

import { TouchableRipple } from "react-native-paper";
import moment from "moment";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ripple from "react-native-material-ripple";

import { ThemeContext } from "../../../navigation/ThemeProvider";

export default function TaskCard({
    taskItem,
    navigation,
    updateIsCompleted,
    onToggleSnackBar,
    handleSetTaskId,
    onDismissSnackBar,
    // handleSelectTask,
    // selectHelper,
}) {
    const { theme } = useContext(ThemeContext);

    const [checked, setChecked] = useState(taskItem.isCompleted);

    const handleCompleted = () => {
        setChecked(!checked);
        updateIsCompleted(checked, taskItem.id);
        if (!checked) {
            onToggleSnackBar();
            handleSetTaskId(taskItem.id);
        } else {
            onDismissSnackBar();
        }
    };

    // const [isSelected, setSelected] = useState(false);

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
                        ]}
                        numberOfLines={1}
                    >
                        {taskItem.taskTitle}
                    </Text>
                    <Text
                        style={[
                            styles.taskItemDate,
                            checked && {
                                textDecorationLine: "line-through",
                            },
                        ]}
                        numberOfLines={1}
                    >
                        {"Due " + moment(taskItem.taskTime.toDate()).calendar()}
                    </Text>
                    <Text
                        style={[
                            styles.taskContent,
                            checked && {
                                textDecorationLine: "line-through",
                            },
                        ]}
                    >
                        {taskItem.taskContent}
                    </Text>
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
