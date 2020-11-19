import React, { useState, useContext } from "react";
import { Text, View, StyleSheet, Clipboard, ToastAndroid } from "react-native";
import {
    FAB,
    Portal,
    Provider,
    Appbar,
    Chip,
    Button,
    Dialog,
    Paragraph,
} from "react-native-paper";
import moment from "moment";
import * as MailComposer from "expo-mail-composer";

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
        if (taskTime !== "" || taskContent !== "" || collaborators.length > 0) {
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

    /**
     * Delete Dialog
     */
    const [visible, setVisible] = useState(false);
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);
    const handleDelete = (id) => {
        deleteTask(navigation, id);
        hideDialog();
    };

    return (
        <Provider>
            <Appbar.Header
                style={{ backgroundColor: theme.colorAccentPrimary }}
            >
                <Appbar.BackAction
                    onPress={() => {
                        navigation.goBack();
                    }}
                />
                <Appbar.Content title="Task Item" />
            </Appbar.Header>
            <Portal>
                <Dialog
                    visible={visible}
                    onDismiss={hideDialog}
                    style={{
                        backgroundColor: theme.backgroundColor,
                        width: 320,
                        alignSelf: "center",
                        borderRadius: 15,
                    }}
                >
                    <Dialog.Content>
                        <Text style={{ fontSize: 16 }}>
                            The note will be deleted
                        </Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button
                            onPress={() => console.log("Cancel")}
                            color={theme.colorAccentSecondary}
                        >
                            Cancel
                        </Button>
                        <Button
                            onPress={() => handleDelete(id)}
                            color={theme.colorAccentSecondary}
                        >
                            Delete
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <View style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
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
                                Due {moment(taskTime.toDate()).calendar()}
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
                                    collaborators.length > 0 && {
                                        paddingBottom: 5,
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
                    {collaborators.length > 0 && (
                        <View
                            style={[
                                {
                                    flexDirection: "row",
                                    flexWrap: "wrap",
                                    marginBottom: 15,
                                },
                                taskContent === "" && { marginTop: 15 },
                            ]}
                        >
                            {collaborators.map((item) => (
                                <Chip
                                    icon="email"
                                    style={{
                                        marginVertical: 5,
                                        marginRight: 5,
                                    }}
                                >
                                    {item}
                                </Chip>
                            ))}
                        </View>
                    )}
                </View>
                <Portal>
                    <FAB.Group
                        open={open}
                        color="white"
                        fabStyle={{
                            backgroundColor: theme.colorAccentSecondary,
                        }}
                        icon={open ? "dots-vertical" : "dots-horizontal"}
                        actions={[
                            {
                                icon: "email-check",
                                color: theme.colorAccentSecondary,
                                label: "Send Email",
                                onPress: () => {
                                    MailComposer.composeAsync({
                                        recipients: collaborators,
                                        subject: taskTitle,
                                        body: taskTime,
                                    });
                                },
                                style: {
                                    backgroundColor: theme.backgroundColor,
                                },
                            },
                            // {
                            //     icon: "share-variant",
                            //     color: theme.colorAccentSecondary,
                            //     label: "Share",
                            //     onPress: () => handleCopy(),
                            //     style: {
                            //         backgroundColor: theme.backgroundColor,
                            //     },
                            // },
                            {
                                icon: "trash-can-outline",
                                color: theme.colorAccentSecondary,
                                label: "Delete",
                                onPress: () => showDialog(),
                                style: {
                                    backgroundColor: theme.backgroundColor,
                                },
                            },
                            {
                                icon: "pencil",
                                label: "Edit",
                                color: theme.colorAccentSecondary,
                                onPress: () =>
                                    navigation.navigate(
                                        "EditTask",
                                        route.params
                                    ),
                                style: {
                                    backgroundColor: theme.backgroundColor,
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
