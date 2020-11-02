import React, { useState, useContext } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ToastAndroid,
    Animated,
} from "react-native";
import { CheckBox } from "react-native-elements";
import { Appbar, TouchableRipple, Switch } from "react-native-paper";
import BottomSheet from "rn-sliding-up-panel";

import { ThemeContext } from "../navigation/ThemeProvider";

import Colors from "../theming/colors";
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
    } = route.params;

    const { theme } = useContext(ThemeContext);

    const [newTaskTitle, setNewTaskTitle] = useState(taskTitle);
    const [newTaskContent, setNewTaskContent] = useState(taskContent);
    const [isChecked, setIsChecked] = useState(isCompleted);

    const [isVisible, setIsVisible] = useState(false);
    const [chosenDate, setChosenDate] = useState(taskTime);

    const [priority, setPriority] = useState(priorityIs);

    const handleIsCompleted = (isChecked) => setIsChecked(!isChecked);

    const handlePicker = (date) => {
        setChosenDate(moment(date).calendar());
        setIsVisible(false);
    };
    const showPicker = () => setIsVisible(true);
    const hidePicker = () => setIsVisible(false);

    const handleEditTask = async () => {
        if (newTaskTitle === "") {
            ToastAndroid.show("Task title is empty", ToastAndroid.SHORT);
        } else {
            await updateTask(
                navigation,
                id,
                newTaskTitle,
                chosenDate,
                newTaskContent,
                priority,
                isChecked
            );
            ToastAndroid.show("Task Updated", ToastAndroid.SHORT);
        }
    };

    return (
        <>
            <Appbar.Header style={{ backgroundColor: theme.accentColor }}>
                <Appbar.BackAction
                    onPress={() => {
                        navigation.goBack();
                    }}
                />
                <Appbar.Content title="Edit Task" />
                <Appbar.Action icon="alarm" onPress={showPicker} />
                <Appbar.Action
                    icon="priority-high"
                    onPress={() => _panel.show()}
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
                    { backgroundColor: theme.background },
                ]}
            >
                <View>
                    <TextInput
                        multiline={true}
                        style={[styles.titleInput, { color: theme.textColor }]}
                        placeholder="Title"
                        onChangeText={(text) => setNewTaskTitle(text)}
                        defaultValue={newTaskTitle}
                        placeholderTextColor={theme.subTextColor}
                    />
                    <TextInput
                        style={[
                            styles.dateInput,
                            { color: theme.subTextColor },
                        ]}
                        defaultValue={chosenDate}
                        editable={false}
                        placeholder="Reminder Time"
                        placeholderTextColor={theme.subTextColor}
                    />
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
                <DateTimePickerModal
                    isVisible={isVisible}
                    onConfirm={handlePicker}
                    onCancel={hidePicker}
                    mode="datetime"
                    is24Hour={false}
                />
            </View>
            <BottomSheet
                animatedValue={new Animated.Value(290)}
                ref={(c) => (_panel = c)}
                draggableRange={{ top: 290, bottom: 50 }}
                snappingPoints={[50, 290]}
                showBackdrop={false}
            >
                <View
                    style={[
                        styles.bottomSheetContainer,
                        { backgroundColor: theme.bottomsheetColor },
                    ]}
                >
                    <View style={styles.indicator} />
                    <Text
                        style={[
                            styles.priorityHeading,
                            { color: theme.secondaryAccentColor },
                        ]}
                    >
                        Priority
                    </Text>
                    <TouchableRipple
                        style={styles.setPriority}
                        onPress={() => setPriority(1)}
                    >
                        <>
                            <Text
                                style={{ fontSize: 15, color: theme.textColor }}
                            >
                                High
                            </Text>
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
                            <Text
                                style={{ fontSize: 15, color: theme.textColor }}
                            >
                                Medium
                            </Text>
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
                            <Text
                                style={{ fontSize: 15, color: theme.textColor }}
                            >
                                Low
                            </Text>
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
                    <Text
                        style={[
                            styles.priorityHeading,
                            { color: theme.secondaryAccentColor },
                        ]}
                    >
                        Completed
                    </Text>
                    <TouchableRipple
                        style={styles.setCompleted}
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
                                color={theme.secondaryAccentColor}
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
