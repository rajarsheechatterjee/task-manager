import React, { useState, useContext } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ToastAndroid,
    Animated,
} from "react-native";
import {
    Appbar,
    TouchableRipple,
    Switch,
    Portal,
    Dialog,
    Provider,
    Button,
    TextInput as PaperInput,
    Chip,
    RadioButton,
} from "react-native-paper";
import BottomSheet from "rn-sliding-up-panel";
import * as MailComposer from "expo-mail-composer";

import { ThemeContext } from "../navigation/ThemeProvider";

import { updateTask } from "../utils/firebase";

import moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function EditTask({ route, navigation }) {
    const {
        id,
        taskTitle,
        taskTime,
        taskContent,
        isCompleted,
        priorityIs,
        collaborators,
    } = route.params;

    const { theme } = useContext(ThemeContext);

    const [newTaskTitle, setNewTaskTitle] = useState(taskTitle);
    const [newTaskContent, setNewTaskContent] = useState(taskContent);
    const [isChecked, setIsChecked] = useState(isCompleted);

    const [isVisible, setIsVisible] = useState(false);
    const [chosenDate, setChosenDate] = useState(taskTime);

    const [priority, setPriority] = useState(priorityIs);

    const handleIsCompleted = (isChecked) => setIsChecked(!isChecked);

    // Date & Time Picker
    const handlePicker = (date) => {
        setChosenDate(date);
        setIsVisible(false);
    };
    const showPicker = () => setIsVisible(true);
    const hidePicker = () => setIsVisible(false);

    // Collaborators Dialog
    const [dialogVisible, setDialogVisible] = useState(false);
    const [error, setError] = useState(false);
    const showDialog = () => setDialogVisible(true);
    const hideDialog = () => {
        setDialogVisible(false);
        setError(false);
    };

    // Validate and add email
    const [email, setEmail] = useState();
    const [emails, setEmails] = useState(collaborators);
    const [sendEmail, setSendEmail] = useState(false);
    const onToggleSwitch = () => setSendEmail(!sendEmail);
    const addEmail = () => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (re.test(String(email).toLowerCase())) {
            if (emails.length > 0) {
                const index = emails.indexOf(email);
                if (index > -1) {
                    setError("Email already added");
                } else {
                    setEmails((emails) => emails.concat(email));
                    setEmail("");
                    setDialogVisible(false);
                    setError("");
                }
            } else {
                setEmails((emails) => emails.concat(email));
                setEmail("");
                setDialogVisible(false);
                setError("");
            }
        } else {
            setError("Enter a valid email");
        }
    };

    const handleEditTask = async () => {
        if (newTaskTitle === "") {
            ToastAndroid.show("Task title is empty", ToastAndroid.SHORT);
        } else {
            if (sendEmail && emails.length > 0) {
                await MailComposer.composeAsync({
                    recipients: emails,
                    subject: "[Updated] " + newTaskTitle,
                    body: newTaskContent,
                });
            }

            await updateTask(
                navigation,
                id,
                newTaskTitle,
                chosenDate,
                newTaskContent,
                priority,
                emails,
                isChecked
            );
            ToastAndroid.show("Task Updated", ToastAndroid.SHORT);
        }
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
                <Appbar.Content title="Edit Task" />
                <Appbar.Action icon="alarm" onPress={showPicker} />
                {/* <Appbar.Action
                    icon="priority-high"
                    onPress={() => _panel.show()}
                /> */}
                <Appbar.Action
                    icon="account-multiple-plus"
                    onPress={showDialog}
                />

                <Appbar.Action
                    icon="check"
                    onPress={handleEditTask}
                    disabled={newTaskTitle === "" ? true : false}
                />
            </Appbar.Header>
            <View
                style={[
                    styles.mainContainer,
                    { backgroundColor: theme.backgroundColor },
                ]}
            >
                <Portal>
                    <Dialog
                        visible={dialogVisible}
                        onDismiss={hideDialog}
                        style={{
                            backgroundColor: theme.backgroundColor,
                            borderRadius: 10,
                        }}
                    >
                        <Dialog.Title style={{ color: theme.textColor }}>
                            Add Collaborators
                        </Dialog.Title>
                        <Dialog.Content>
                            <PaperInput
                                label="Email"
                                mode="outlined"
                                dense={true}
                                error={error}
                                onChangeText={(text) => setEmail(text)}
                                selectionColor={theme.colorAccentSecondary}
                                theme={{
                                    colors: {
                                        primary: theme.colorAccentSecondary,
                                        text: theme.textColor,
                                        underlineColor: "transparent",
                                    },
                                }}
                                style={{
                                    backgroundColor: theme.backgroundColor,
                                }}
                            />
                            {error !== "" && (
                                <Text
                                    style={{
                                        color: "red",
                                        paddingTop: 5,
                                    }}
                                >
                                    {error}
                                </Text>
                            )}
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button
                                onPress={() => setEmails([])}
                                color={theme.colorAccentSecondary}
                            >
                                Clear emails
                            </Button>
                            <Button
                                onPress={addEmail}
                                color={theme.colorAccentSecondary}
                            >
                                Add
                            </Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
                <View>
                    <TextInput
                        multiline={true}
                        style={[styles.titleInput, { color: theme.textColor }]}
                        placeholder="Title"
                        onChangeText={(text) => setNewTaskTitle(text)}
                        defaultValue={newTaskTitle}
                        placeholderTextColor={theme.subTextColor}
                    />
                    <Text
                        onPress={showPicker}
                        style={[
                            styles.dateInput,
                            { color: theme.subTextColor },
                        ]}
                    >
                        {chosenDate !== ""
                            ? moment(chosenDate).calendar()
                            : "Reminder Time"}
                    </Text>
                    <TextInput
                        style={[
                            styles.contentInput,
                            { color: theme.textColor },
                        ]}
                        onChangeText={(text) => setNewTaskContent(text)}
                        placeholder="Content"
                        defaultValue={newTaskContent}
                        multiline={true}
                        spellCheck={false}
                        placeholderTextColor={theme.subTextColor}
                    />
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        marginHorizontal: 10,
                        marginVertical: 50,
                        fontSize: 15,
                        paddingTop: 10,
                        borderTopWidth: 1.2,
                        borderTopColor: "#E8E8E8",
                        lineHeight: 23,
                    }}
                >
                    {emails.length > 0 ? (
                        emails.map((item) => (
                            <Chip
                                icon="email"
                                style={{
                                    marginVertical: 5,
                                    marginRight: 5,
                                }}
                            >
                                {item}
                            </Chip>
                        ))
                    ) : (
                        <Chip
                            onPress={showDialog}
                            icon="email-plus"
                            style={{
                                marginVertical: 5,
                                marginRight: 5,
                            }}
                        >
                            Add Collaborators
                        </Chip>
                    )}
                </View>
                <DateTimePickerModal
                    isVisible={isVisible}
                    onConfirm={handlePicker}
                    onCancel={hidePicker}
                    mode="datetime"
                    is24Hour={false}
                />
            </View>
            <BottomSheet
                animatedValue={new Animated.Value(220)}
                ref={(c) => (_panel = c)}
                draggableRange={{ top: 370, bottom: 60 }}
                snappingPoints={[60, 220, 370]}
                showBackdrop={false}
            >
                <View
                    style={[
                        styles.bottomSheetContainer,
                        { backgroundColor: theme.bottomSheet },
                    ]}
                >
                    <View style={styles.indicator} />
                    <Text
                        style={[
                            styles.priorityHeading,
                            { color: theme.colorAccentSecondary },
                        ]}
                    >
                        Collaborators
                    </Text>
                    <TouchableRipple
                        style={[
                            styles.setPriority,
                            { paddingRight: 35, paddingVertical: 10 },
                        ]}
                        onPress={() => setSendEmail(!sendEmail)}
                    >
                        <>
                            <Text
                                style={{
                                    fontSize: 15,
                                    color: theme.textColor,
                                }}
                            >
                                Send updated email to collaborators
                            </Text>
                            <Switch
                                value={sendEmail}
                                onValueChange={onToggleSwitch}
                                color={theme.colorAccentSecondary}
                            />
                        </>
                    </TouchableRipple>
                    <Text
                        style={[
                            styles.priorityHeading,
                            { color: theme.colorAccentSecondary },
                        ]}
                    >
                        Completed
                    </Text>
                    <TouchableRipple
                        style={[
                            styles.setPriority,
                            { paddingRight: 35, paddingVertical: 10 },
                        ]}
                        onPress={() => handleIsCompleted(isChecked)}
                    >
                        <>
                            <Text
                                style={{ fontSize: 15, color: theme.textColor }}
                            >
                                Set completed
                            </Text>
                            <Switch
                                value={isChecked}
                                onValueChange={() =>
                                    handleIsCompleted(isChecked)
                                }
                                color={theme.colorAccentSecondary}
                            />
                        </>
                    </TouchableRipple>
                    <Text
                        style={[
                            styles.priorityHeading,
                            { color: theme.colorAccentSecondary },
                        ]}
                    >
                        Priority
                    </Text>
                    <RadioButton.Group
                        onValueChange={(newValue) => setPriority(newValue)}
                        value={priority}
                    >
                        <RadioButton.Item
                            label="High"
                            value={1}
                            color={theme.priority.high}
                            uncheckedColor={theme.priority.high}
                            style={{ paddingHorizontal: 20, paddingRight: 35 }}
                            labelStyle={{ color: theme.textColor }}
                        />
                        <RadioButton.Item
                            label="Medium"
                            value={2}
                            color={theme.priority.mid}
                            uncheckedColor={theme.priority.mid}
                            style={{ paddingHorizontal: 20, paddingRight: 35 }}
                            labelStyle={{ color: theme.textColor }}
                        />
                        <RadioButton.Item
                            label="Low"
                            value={3}
                            color={theme.priority.low}
                            uncheckedColor={theme.priority.low}
                            style={{ paddingHorizontal: 20, paddingRight: 35 }}
                            labelStyle={{ color: theme.textColor }}
                        />
                    </RadioButton.Group>
                </View>
            </BottomSheet>
        </Provider>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 10,
    },
    dateInput: { marginHorizontal: 10, paddingTop: 5 },
    titleInput: {
        fontSize: 30,
        fontWeight: "bold",
        paddingVertical: 15,
        marginHorizontal: 10,
        borderBottomWidth: 1.2,
        borderBottomColor: "#E8E8E8",
    },
    contentInput: {
        paddingTop: 10,
        marginHorizontal: 10,
        fontSize: 18,
        lineHeight: 29,
    },
    checkBox: {
        borderRadius: 10,
        borderWidth: 0,
    },
    bottomSheetContainer: {
        flex: 1,
        paddingTop: 20,
        paddingBottom: 8,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        elevation: 10,
    },
    priorityHeading: {
        fontWeight: "bold",
        fontSize: 15,
        paddingHorizontal: 20,
        paddingVertical: 5,
    },
    setPriority: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    indicator: {
        position: "absolute",
        justifyContent: "center",
        alignSelf: "center",
        width: 40,
        height: 5,
        backgroundColor: "rgba(0,0,0,0.75)",
        borderRadius: 25,
        top: 7,
    },
    setCompleted: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
});
