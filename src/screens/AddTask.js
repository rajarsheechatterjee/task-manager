import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableHighlight,
    TouchableOpacity,
    TouchableNativeFeedback,
} from "react-native";

import firebase from "../../firebase";
import "firebase/firestore";

import moment from "moment";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Ripple from "react-native-material-ripple";

export default function Home({ navigation }) {
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [newTaskContent, setNewTaskContent] = useState("");

    const [isVisible, setIsVisible] = useState(false);
    const [chosenDate, setChosenDate] = useState("");

    async function logout() {
        await firebase.auth().signOut();
        navigation.navigate("Login");
    }

    async function addTask(
        taskTitle,
        taskTime,
        taskContent,
        isCompleted = false,
        isUpdated = false
    ) {
        const timeStamp = firebase.firestore.Timestamp.fromDate(new Date());

        await firebase
            .firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .collection("tasks")
            .add({
                userId: firebase.auth().currentUser.uid,
                taskTitle: taskTitle,
                taskTime: taskTime,
                taskContent: taskContent,
                createdAt: timeStamp,
                isCompleted: isCompleted,
                isUpdated: isUpdated,
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
    showPicker = () => {
        setChosenDate("");
        setIsVisible(true);
    };

    const hidePicker = () => {
        setIsVisible(false);
    };

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.screenHeader}>Add a New Task</Text>

            <View>
                <TextInput
                    // defaultValue={newTaskTitle}
                    style={[styles.txtinpt, styles.txtInputTitle]}
                    onChangeText={(text) => setNewTaskTitle(text)}
                    placeholder="Task Title"
                />
            </View>
            <View style={{ flexDirection: "row" }}>
                <TextInput
                    style={[{ width: "59%", marginRight: 5 }, styles.txtinpt]}
                    placeholder="Date & Time"
                    defaultValue={chosenDate}
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
                    multiline={true}
                    style={styles.txtinpt}
                    onChangeText={(text) => setNewTaskContent(text)}
                    placeholder="Content"
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
                    Add Task
                </Text>
            </TouchableOpacity>
            <View style={styles.buttonWrapper}>
                <TouchableHighlight
                    style={[{ opacity: 0.8 }, styles.button]}
                    onPress={() => logout()}
                    activeOpacity={0.6}
                    underlayColor="#DDDDDD"
                >
                    <MaterialCommunityIcons
                        name="logout-variant"
                        color="#118086"
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
