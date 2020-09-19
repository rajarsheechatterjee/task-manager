import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
} from "react-native";
import Button from "../components/Button";
import { CheckBox } from "react-native-elements";

import * as SMS from "expo-sms";

import { logout, addTask, getTasks } from "../utils/firebase";

import moment from "moment";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function Home({ navigation }) {
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [newTaskContent, setNewTaskContent] = useState("");
    const [priorityIs, setPriorityIs] = useState(2);

    const [isVisible, setIsVisible] = useState(false);
    const [chosenDate, setChosenDate] = useState("");

    const handleAddTask = async () => {
        await addTask(
            navigation,
            newTaskTitle,
            chosenDate,
            newTaskContent,
            priorityIs
        );

        setNewTaskTitle("");
        setNewTaskContent("");
        setChosenDate("");
    };

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

    const handleSMS = async () => {
        const isAvailable = await SMS.isAvailableAsync();
        if (isAvailable) {
            const { result } = await SMS.sendSMSAsync(
                ["7982548300", "9654294131"],
                "You have been added as a collaborator"
            );
        }
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
                    defaultValue={newTaskTitle}
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
                    defaultValue={newTaskContent}
                />
            </View>
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
                        checkedColor="red"
                        uncheckedColor="red"
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                        checked={priorityIs === 1 ? true : false}
                        onPress={() => setPriorityIs(1)}
                        containerStyle={styles.checkBox}
                    />
                    <CheckBox
                        center
                        title="Medium"
                        checkedColor="orange"
                        uncheckedColor="orange"
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

            {/* <Button onPress={handleSMS} title="Send SMS" /> */}

            <View style={styles.buttonWrapper}>
                <TouchableHighlight
                    style={[{ opacity: 0.8 }, styles.button]}
                    onPress={() => logout(navigation)}
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
        // flex: 1 / 3,
        // paddingHorizontal: 10,
    },
});
