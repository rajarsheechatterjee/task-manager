import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, ToastAndroid } from "react-native";
import { addTask } from "../../utils/firebase";
import { Appbar } from "react-native-paper";

import Colors from "../../theming/colors";
import { CheckBox } from "react-native-elements";
import Button from "../../components/Button";
import Ripple from "react-native-material-ripple";

import moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function Home({ navigation }) {
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [newTaskContent, setNewTaskContent] = useState("");
    const [priorityIs, setPriorityIs] = useState(2);

    const [isVisible, setIsVisible] = useState(false);
    const [chosenDate, setChosenDate] = useState("");

    const handleAddTask = async () => {
        if (newTaskTitle === "") {
            ToastAndroid.show("Task title is empty", ToastAndroid.SHORT);
        } else if (newTaskContent === "") {
            ToastAndroid.show("Task content is empty", ToastAndroid.SHORT);
        } else if (chosenDate === "") {
            ToastAndroid.show("Task time is empty", ToastAndroid.SHORT);
        } else {
            await addTask(
                navigation,
                newTaskTitle,
                chosenDate,
                newTaskContent,
                priorityIs
            );

            ToastAndroid.show("Task Added", ToastAndroid.SHORT);

            setNewTaskTitle("");
            setNewTaskContent("");
            setChosenDate("");
        }
    };

    // Date & time picker
    const handlePicker = (datetime) => {
        setChosenDate(moment(datetime).format("YYYY-MM-DD HH:mm"));
        setIsVisible(false);
    };

    const showPicker = () => {
        setChosenDate("");
        setIsVisible(true);
    };

    const hidePicker = () => {
        setIsVisible(false);
    };

    /**
     * TODO
     * Redesign this screen
     *
     */

    return (
        <>
            <Appbar.Header>
                <Appbar.BackAction
                    onPress={() => navigation.navigate("Your Tasks")}
                />
                <Appbar.Content title="Add Task" />
                <Appbar.Action icon="alarm" onPress={showPicker} />
                <Appbar.Action icon="pin" />
                <Appbar.Action
                    icon="check"
                    onPress={handleAddTask}
                    disabled={newTaskTitle === "" ? true : false}
                />
            </Appbar.Header>
            <View style={styles.mainContainer}>
                <Text style={styles.screenHeader}>Add a New Task</Text>

                {/* Task title input */}
                <View>
                    <TextInput
                        style={[styles.txtinpt, styles.txtInputTitle]}
                        onChangeText={(text) => setNewTaskTitle(text)}
                        placeholder="Task Title"
                        defaultValue={newTaskTitle}
                    />
                </View>

                {/* Task reminder time picker */}
                <View style={{ flexDirection: "row" }}>
                    <TextInput
                        style={[
                            { flex: 2 / 3, marginRight: 5 },
                            styles.txtinpt,
                        ]}
                        placeholder="Date & Time"
                        defaultValue={chosenDate}
                        editable={false}
                    />
                    <Ripple
                        style={styles.datePicker}
                        onPress={() => showPicker()}
                    >
                        <Text numberOfLines={1} style={styles.datePickerText}>
                            Pick Date & Time
                        </Text>
                    </Ripple>
                    <DateTimePickerModal
                        isVisible={isVisible}
                        onConfirm={handlePicker}
                        onCancel={hidePicker}
                        mode="datetime"
                        is24Hour={false}
                    />
                </View>

                {/* Task content input */}
                <View>
                    <TextInput
                        multiline={true}
                        style={styles.txtinpt}
                        onChangeText={(text) => setNewTaskContent(text)}
                        placeholder="Content"
                        defaultValue={newTaskContent}
                    />
                </View>

                {/* Set priority checkboxes */}
                <View>
                    <View>
                        <Text style={styles.taskStatus}>Task Priority</Text>
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <CheckBox
                            center
                            title="High"
                            checkedColor={Colors.priorityHigh}
                            uncheckedColor={Colors.priorityHigh}
                            checkedIcon="dot-circle-o"
                            uncheckedIcon="circle-o"
                            checked={priorityIs === 1 ? true : false}
                            onPress={() => setPriorityIs(1)}
                            containerStyle={styles.checkBox}
                        />
                        <CheckBox
                            center
                            title="Medium"
                            checkedColor={Colors.priorityMid}
                            uncheckedColor={Colors.priorityMid}
                            checkedIcon="dot-circle-o"
                            uncheckedIcon="circle-o"
                            checked={priorityIs === 2 ? true : false}
                            onPress={() => setPriorityIs(2)}
                            containerStyle={styles.checkBox}
                        />
                        <CheckBox
                            center
                            title="Low"
                            checkedColor="blue"
                            uncheckedColor="blue"
                            checkedIcon="dot-circle-o"
                            uncheckedIcon="circle-o"
                            checked={priorityIs === 3 ? true : false}
                            onPress={() => setPriorityIs(3)}
                            containerStyle={styles.checkBox}
                        />
                    </View>
                </View>
                <Button onPress={handleAddTask} title="Add Task" />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 10,
        paddingTop: 60,
        backgroundColor: Colors.background,
        color: Colors.textColor,
    },
    screenHeader: {
        fontSize: 28,
        fontWeight: "700",
        marginBottom: 10,
        textAlign: "center",
    },
    inputLabel: {
        fontWeight: "700",
        marginBottom: 10,
        fontSize: 18,
    },
    txtInputTitle: {
        fontWeight: "700",
    },
    txtinpt: {
        borderRadius: 10,
        backgroundColor: "white",
        marginVertical: 5,
        padding: 10,
        fontSize: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    buttonWrapper: {
        position: "absolute",
        bottom: 20,
        right: 20,
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
    datePicker: {
        flex: 1 / 3,
        elevation: 8,
        backgroundColor: Colors.accentColor,
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 13,
        marginVertical: 5,
    },
    addTaskButton: {
        elevation: 8,
        backgroundColor: Colors.accentColor,
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 13,
        marginVertical: 10,
    },
    datePickerText: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",
    },
    taskStatus: {
        fontWeight: "700",
        fontSize: 18,
        textAlign: "center",
        marginVertical: 10,
    },
    checkBox: {
        borderRadius: 10,
        elevation: 3,
        borderWidth: 0,
        backgroundColor: "white",
        // flex: 1 / 3,
        // paddingHorizontal: 10,
    },
});
