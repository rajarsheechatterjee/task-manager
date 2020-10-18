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
            // } else if (newTaskContent === "") {
            //     ToastAndroid.show("Task content is empty", ToastAndroid.SHORT);
            // } else if (chosenDate === "") {
            //     ToastAndroid.show("Reminder time is empty", ToastAndroid.SHORT);
        } else {
            await addTask(
                navigation,
                newTaskTitle,
                chosenDate,
                newTaskContent,
                priorityIs
            );

            ToastAndroid.show("Task Added", ToastAndroid.SHORT);
            clearFields();
        }
    };

    const clearFields = () => {
        setNewTaskTitle("");
        setNewTaskContent("");
        setChosenDate("");
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
            <Appbar.Header style={{ backgroundColor: Colors.accentColor }}>
                <Appbar.BackAction
                    onPress={() => {
                        navigation.navigate("Your Tasks");
                        clearFields();
                    }}
                />
                <Appbar.Content title="Add Task" />
                <Appbar.Action icon="alarm" onPress={showPicker} />
                <Appbar.Action icon="pin" disabled={true} />
                <Appbar.Action
                    icon="check"
                    onPress={handleAddTask}
                    disabled={newTaskTitle === "" ? true : false}
                />
            </Appbar.Header>
            <View style={styles.mainContainer}>
                <View>
                    <TextInput
                        style={styles.dateInput}
                        defaultValue={chosenDate}
                        editable={false}
                        placeholder="Date & Time"
                    />
                    <TextInput
                        style={styles.titleInput}
                        placeholder="Title"
                        onChangeText={(text) => setNewTaskTitle(text)}
                        defaultValue={newTaskTitle}
                    />
                    <TextInput
                        style={styles.contentInput}
                        onChangeText={(text) => setNewTaskContent(text)}
                        placeholder="Content"
                        defaultValue={newTaskContent}
                        multiline={true}
                    />
                </View>
                <DateTimePickerModal
                    isVisible={isVisible}
                    onConfirm={handlePicker}
                    onCancel={hidePicker}
                    mode="datetime"
                    is24Hour={false}
                />
            </View>
            <View style={styles.prioritContainer}>
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
        </>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: 10,
    },
    dateInput: { marginHorizontal: 10, paddingTop: 5, paddingBottom: 2 },
    titleInput: {
        fontSize: 30,
        fontWeight: "bold",
        paddingBottom: 15,
        marginHorizontal: 10,
        borderBottomWidth: 1.2,
        borderBottomColor: "#C7C7CD",
    },
    contentInput: {
        paddingTop: 15,
        marginHorizontal: 10,
        fontSize: 17,
    },
    prioritContainer: {
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: Colors.background,
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    checkBox: {
        borderRadius: 10,
        elevation: 1,
        borderWidth: 0,
        backgroundColor: "white",
    },
});
