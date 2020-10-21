import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, ToastAndroid } from "react-native";

import { addTask } from "../../utils/firebase";
import Colors from "../../theming/colors";

import { Appbar, TouchableRipple } from "react-native-paper";
import { CheckBox } from "react-native-elements";
import BottomSheet from "rn-sliding-up-panel";
import moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function Home({ navigation }) {
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [newTaskContent, setNewTaskContent] = useState("");
    const [priority, setPriority] = useState(2);

    const [isVisible, setIsVisible] = useState(false);
    const [chosenDate, setChosenDate] = useState("");

    const handleAddTask = async () => {
        if (newTaskTitle === "") {
            ToastAndroid.show("Task title is empty", ToastAndroid.SHORT);
        } else {
            await addTask(
                navigation,
                newTaskTitle,
                chosenDate,
                newTaskContent,
                priority
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
    const handlePicker = (date) => {
        setChosenDate(moment(date).calendar());
        setIsVisible(false);
    };
    const showPicker = () => setIsVisible(true);
    const hidePicker = () => setIsVisible(false);

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
                <Appbar.Action
                    icon="priority-high"
                    onPress={() => _panel.show()}
                />
                <Appbar.Action
                    icon="check"
                    onPress={handleAddTask}
                    disabled={newTaskTitle === "" ? true : false}
                />
            </Appbar.Header>
            <View style={styles.mainContainer}>
                <View>
                    <TextInput
                        multiline={true}
                        style={styles.titleInput}
                        placeholder="Title"
                        onChangeText={(text) => setNewTaskTitle(text)}
                        defaultValue={newTaskTitle}
                    />
                    <TextInput
                        style={styles.dateInput}
                        defaultValue={chosenDate}
                        editable={false}
                        placeholder="Reminder Time"
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
            <BottomSheet
                ref={(c) => (_panel = c)}
                draggableRange={{ top: 210, bottom: 50 }}
                snappingPoints={[50, 210]}
                showBackdrop={false}
            >
                <View style={styles.bottomSheetContainer}>
                    <View style={styles.indicator} />
                    <Text style={styles.priorityHeading}>Priority</Text>
                    <TouchableRipple
                        style={styles.setPriority}
                        onPress={() => setPriority(1)}
                    >
                        <>
                            <Text style={{ fontSize: 15 }}>High</Text>
                            <CheckBox
                                checkedColor={Colors.priorityHigh}
                                uncheckedColor={Colors.priorityHigh}
                                checkedIcon="dot-circle-o"
                                uncheckedIcon="circle-o"
                                checked={priority === 1 ? true : false}
                                containerStyle={styles.checkBox}
                                onPress={() => setPriority(1)}
                            />
                        </>
                    </TouchableRipple>
                    <TouchableRipple
                        style={styles.setPriority}
                        onPress={() => setPriority(2)}
                    >
                        <>
                            <Text style={{ fontSize: 15 }}>Medium</Text>
                            <CheckBox
                                checkedColor={Colors.priorityMid}
                                uncheckedColor={Colors.priorityMid}
                                checkedIcon="dot-circle-o"
                                uncheckedIcon="circle-o"
                                checked={priority === 2 ? true : false}
                                containerStyle={styles.checkBox}
                                onPress={() => setPriority(2)}
                            />
                        </>
                    </TouchableRipple>
                    <TouchableRipple
                        style={styles.setPriority}
                        onPress={() => setPriority(3)}
                    >
                        <>
                            <Text style={{ fontSize: 15 }}>Low</Text>
                            <CheckBox
                                checkedColor={Colors.priorityLow}
                                uncheckedColor={Colors.priorityLow}
                                checkedIcon="dot-circle-o"
                                uncheckedIcon="circle-o"
                                checked={priority === 3 ? true : false}
                                containerStyle={styles.checkBox}
                                onPress={() => setPriority(3)}
                            />
                        </>
                    </TouchableRipple>
                </View>
            </BottomSheet>
        </>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.background,
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
        backgroundColor: "white",
        paddingTop: 17,
        paddingBottom: 8,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        elevation: 10,
    },
    priorityHeading: {
        fontWeight: "bold",
        fontSize: 15,
        color: Colors.accentColor,
        paddingHorizontal: 16,
        paddingBottom: 5,
    },
    setPriority: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
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
});
