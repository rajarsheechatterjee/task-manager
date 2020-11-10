import React, { useState, useContext } from "react";
import { Text, View, StyleSheet, Clipboard, ToastAndroid } from "react-native";
import { FAB, Portal, Provider, Appbar } from "react-native-paper";
import moment from "moment";

import { deleteTask } from "../../utils/firebase";

import { ThemeContext } from "../../navigation/ThemeProvider";

export default function TaskItem({ route, navigation }) {
    const {
        id,
        taskTitle,
        taskContent,
        createdAt,
        taskTime,
        collaborators,
        isCompleted,
        isUpdated,
    } = route.params;

    const { theme } = useContext(ThemeContext);

    // FAB
    const [open, setOpen] = useState(false);
    const onStateChange = () => setOpen(!open);

    const handleDivider = () => {
        if (taskTime !== "" || taskContent !== "") {
            return { borderBottomWidth: 1, borderBottomColor: "#E8E8E8" };
        }
    };

    /**
     * Copy task details to clipboard
     */
    const handleCopy = () => {
        Clipboard.setString(
            `Title: ${taskTitle}, Content: ${taskContent}, Due At: ${taskTime}`
        );
        ToastAndroid.show("Copied task to clipboard", ToastAndroid.SHORT);
    };

    return (
        <Provider>
            <Appbar.Header style={{ backgroundColor: theme.accentColor }}>
                <Appbar.BackAction
                    onPress={() => {
                        navigation.goBack();
                    }}
                />
                <Appbar.Content title="Task Item" />
            </Appbar.Header>
            <View style={{ flex: 1, backgroundColor: theme.background }}>
                <View
                    style={[
                        styles.mainContainer,
                        {
                            backgroundColor: theme.cardBackground,
                            color: theme.textColor,
                        },
                        taskContent === "" && { paddingBottom: 15 },
                    ]}
                >
                    <View style={handleDivider()}>
                        <Text
                            style={[
                                styles.taskTitle,
                                isCompleted && {
                                    textDecorationLine: "line-through",
                                },
                                {
                                    color: theme.textColor,
                                },
                            ]}
                        >
                            {taskTitle}
                        </Text>
                    </View>
                    {taskTime !== "" && (
                        <View>
                            <Text
                                style={[
                                    styles.taskDate,
                                    { color: theme.subTextColor },
                                ]}
                            >
                                Due {moment(Date(taskTime)).calendar()}
                            </Text>
                        </View>
                    )}
                    {taskContent !== "" && (
                        <View>
                            <Text
                                style={[
                                    styles.taskContent,
                                    taskTime === "" && { paddingTop: 10 },
                                    {
                                        color: theme.textColor,
                                    },
                                ]}
                            >
                                {taskContent}
                            </Text>
                        </View>
                    )}
                    {/* <View>
                        <Text style={styles.createdDate}>
                            {isUpdated ? "Updated on " : "Created on"}
                            {moment(createdAt.toDate()).calendar()}
                        </Text>
                    </View> */}
                    {collaborators && (
                        <Text
                            style={[
                                styles.taskContent,
                                { color: theme.textColor, fontSize: 16 },
                            ]}
                        >
                            <Text style={{ fontWeight: "bold" }}>
                                Collaborators:{" "}
                            </Text>
                            {collaborators.map((item) => item).join(", ")}
                        </Text>
                    )}
                </View>
                <Portal>
                    <FAB.Group
                        open={open}
                        color="white"
                        fabStyle={{
                            backgroundColor: theme.secondaryAccentColor,
                        }}
                        icon={open ? "dots-vertical" : "dots-horizontal"}
                        actions={[
                            {
                                icon: "share-variant",
                                color: theme.textColor,
                                label: "Share",
                                onPress: () => handleCopy(),
                                style: {
                                    backgroundColor: theme.fabGroup,
                                },
                            },
                            {
                                icon: "trash-can-outline",
                                color: theme.textColor,
                                label: "Delete",
                                onPress: () => deleteTask(navigation, id),
                                style: {
                                    backgroundColor: theme.fabGroup,
                                },
                            },
                            {
                                icon: "pencil",
                                label: "Edit",
                                color: theme.textColor,
                                onPress: () =>
                                    navigation.navigate(
                                        "EditTask",
                                        route.params
                                    ),
                                style: {
                                    backgroundColor: theme.fabGroup,
                                },
                            },
                        ]}
                        onStateChange={onStateChange}
                    />
                </Portal>
            </View>
        </Provider>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        marginTop: 20,
        margin: 10,
        paddingHorizontal: 20,
        elevation: 2,
        paddingTop: 15,
        borderRadius: 15,
    },
    taskTitle: {
        fontWeight: "700",
        fontSize: 36,
        paddingTop: 5,
        paddingBottom: 10,
    },
    taskDate: {
        paddingVertical: 10,
        fontSize: 14,
    },
    createdDate: {
        marginTop: 5,
        fontSize: 14,
    },
    taskContent: {
        fontSize: 18,
        lineHeight: 29,
        paddingBottom: 15,
    },
});
