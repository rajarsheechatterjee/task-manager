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
    updateCompleted,
    onToggleSnackBar,
    handleSetTaskId,
    onDismissSnackBar,
}) {
    const { theme } = useContext(ThemeContext);

    const [checked, setChecked] = useState(taskItem.isCompleted);

    const { taskTime } = taskItem;

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
            >
                <View style={styles.taskListView}>
                    <View style={styles.checkbox}>
                        <CheckBox
                            center
                            checkedColor={theme.cardIcon}
                            uncheckedColor={theme.cardIcon}
                            checkedIcon="dot-circle-o"
                            uncheckedIcon="circle-o"
                            checked={checked}
                            onPress={() => {
                                handleCompleted();
                            }}
                            containerStyle={styles.checkBoxStyle}
                        />
                    </View>

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
                        {taskTime !== ""
                            ? "Due " + moment(taskTime.toDate()).calendar()
                            : moment(taskItem.createdAt.toDate()).calendar()}
                    </Text>

                    <View style={styles.priorityMarker}>
                        <View
                            style={[
                                styles.taskPriority,
                                priorityColor(taskItem.priorityIs),
                            ]}
                        />
                    </View>
                    <View style={styles.rightChevronContainer}>
                        <Ripple
                            style={styles.rightChevron}
                            rippleContainerBorderRadius={50}
                            rippleCentered={true}
                            onPress={() =>
                                navigation.navigate("Task Item", taskItem)
                            }
                        >
                            <MaterialCommunityIcons
                                name="chevron-right"
                                color={theme.cardIcon}
                                size={30}
                                style={styles.icon}
                            />
                        </Ripple>
                    </View>
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
        marginHorizontal: 80,
        fontSize: 18,
        fontWeight: "bold",
    },
    taskItemDate: {
        marginBottom: 10,
        marginHorizontal: 80,
        fontSize: 14,
        color: "#767676",
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
