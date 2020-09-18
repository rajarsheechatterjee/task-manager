import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
} from "react-native";
import { CheckBox } from "react-native-elements";

import firebase from "../../firebase";
import "firebase/firestore";

import moment from "moment";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function EditTask({ route, navigation }) {
    const taskItem = route.params;
    const [newTaskTitle, setNewTaskTitle] = useState(taskItem.taskTitle);
    const [newTaskContent, setNewTaskContent] = useState(taskItem.taskContent);
    const [isChecked, setIsChecked] = useState(taskItem.isCompleted);

    const [isVisible, setIsVisible] = useState(false);
    const [chosenDate, setChosenDate] = useState(taskItem.taskTime);

    function updateIsCompleted(isChecked, taskId) {
        const dbRef = firebase
            .firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .collection("tasks");

        if (isChecked) {
            dbRef.doc(taskId).update({ isCompleted: false });
            setIsChecked(false);
        } else {
            dbRef.doc(taskId).update({ isCompleted: true });
            setIsChecked(true);
        }
    }
    async function logout() {
        await firebase.auth().signOut();
        navigation.navigate("Login");
    }

    async function addTask(taskTitle, taskTime, taskContent, isCompleted) {
        const timeStamp = firebase.firestore.Timestamp.fromDate(new Date());

        await firebase
            .firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .collection("tasks")
            .doc(taskItem.id)
            .update({
                userId: firebase.auth().currentUser.uid,
                taskTitle: taskTitle,
                taskTime: taskTime,
                taskContent: taskContent,
                createdAt: timeStamp,
                isCompleted: isChecked,
                isUpdated: true,
            })
            .catch((error) => console.log(error));

        setNewTaskTitle("");
        setNewTaskContent("");
        setChosenDate("");

        navigation.navigate("Your Tasks");
    }

    // function clearTextInputs() {
    //     setNewTaskContent("");
    //     setNewTaskTitle("");
    //     setChosenDate("");
    // }

    const handlePicker = (datetime) => {
        setChosenDate(moment(datetime).format("YYYY-MM-DD HH:mm"));
        setIsVisible(false);
    };

    const showPicker = () => {
        setIsVisible(true);
    };

    const hidePicker = () => {
        setIsVisible(false);
    };

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.screenHeader}>Edit Task</Text>
            <View>
                <TextInput
                    defaultValue={taskItem.taskTitle}
                    style={[styles.txtinpt, styles.txtInputTitle]}
                    onChangeText={(text) => setNewTaskTitle(text)}
                    placeholder="Task Title"
                />
            </View>
            <View style={{ flexDirection: "row" }}>
                <TextInput
                    defaultValue={chosenDate}
                    style={[{ width: "59%", marginRight: 5 }, styles.txtinpt]}
                    placeholder="Date & Time"
                    editable={false}
                />
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.datePicker}
                    onPress={() => showPicker()}
                >
                    <Text numberOfLines={1} style={styles.datePickerText}>
                        Pick Date & Time
                    </Text>
                </TouchableOpacity>
                <DateTimePickerModal
                    isVisible={isVisible}
                    onConfirm={handlePicker}
                    onCancel={hidePicker}
                    mode="datetime"
                    is24Hour={false}
                />
            </View>
            <View>
                <TextInput
                    defaultValue={taskItem.taskContent}
                    multiline={true}
                    style={styles.txtinpt}
                    onChangeText={(text) => setNewTaskContent(text)}
                    placeholder="Content"
                />
                <CheckBox
                    center
                    title="Completed"
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checked={isChecked}
                    onPress={() => updateIsCompleted(isChecked, taskItem.id)}
                />
            </View>
            <TouchableOpacity
                activeOpacity={0.7}
                style={styles.addTaskButton}
                onPress={() => {
                    addTask(newTaskTitle, chosenDate, newTaskContent);
                    // clearTextInputs();
                }}
            >
                <Text numberOfLines={1} style={styles.datePickerText}>
                    Save Changes
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 10,
        paddingTop: 60,
        backgroundColor: "#f4f4f4",
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
    taskListView: {
        flex: 1,
        backgroundColor: "#f4f4f4",
        paddingVertical: 10,
    },
    taskList: {
        // margin: 10,
        padding: 10,
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
        width: "40%",
        elevation: 8,
        backgroundColor: "#118086",
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 13,
        marginVertical: 5,
    },
    addTaskButton: {
        elevation: 8,
        backgroundColor: "#118086",
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 13,
        marginVertical: 5,
    },
    datePickerText: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        // textTransform: "uppercase",
    },
});