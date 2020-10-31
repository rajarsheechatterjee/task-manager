import React, { useState, useContext } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ToastAndroid,
    Animated,
    TouchableOpacity,
} from "react-native";
import { TouchableRipple } from "react-native-paper";
import { CheckBox } from "react-native-elements";

import moment from "moment";
import BottomSheet from "rn-sliding-up-panel";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import Appbar from "./Components/AddTaskHeader";
import { addTask } from "../../utils/firebase";
import Colors from "../../theming/colors";

import { ThemeContext } from "../../navigation/ThemeProvider";

export default function AddTask({ navigation }) {
    const { theme } = useContext(ThemeContext);

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
            <Appbar
                navigation={navigation}
                handleRef={() => _panel.show()}
                showPicker={showPicker}
                handleAddTask={handleAddTask}
                newTaskTitle={newTaskTitle}
                clearFields={clearFields}
                theme={theme}
            />
            <View
                style={[
                    styles.mainContainer,
                    { backgroundColor: theme.background },
                ]}
            >
                <View>
                    <TextInput
                        multiline={true}
                        style={styles.titleInput}
                        placeholder="Title"
                        onChangeText={(text) => setNewTaskTitle(text)}
                        defaultValue={newTaskTitle}
                        placeholderTextColor={theme.subTextColor}
                    />
                    <TouchableOpacity onPress={showPicker}>
                        <TextInput
                            style={styles.dateInput}
                            defaultValue={chosenDate}
                            editable={false}
                            placeholder="Reminder Time"
                            placeholderTextColor={theme.subTextColor}
                        />
                    </TouchableOpacity>
                    <TextInput
                        style={styles.contentInput}
                        onChangeText={(text) => setNewTaskContent(text)}
                        placeholder="Content"
                        defaultValue={newTaskContent}
                        multiline={true}
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
                animatedValue={new Animated.Value(210)}
                ref={(c) => (_panel = c)}
                draggableRange={{ top: 210, bottom: 50 }}
                snappingPoints={[50, 210]}
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
                                checkedColor={theme.priorityHigh}
                                uncheckedColor={theme.priorityHigh}
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
                                checkedColor={theme.priorityMid}
                                uncheckedColor={theme.priorityMid}
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
                                checkedColor={theme.priorityLow}
                                uncheckedColor={theme.priorityLow}
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
        color: Colors.accentColor,
        paddingHorizontal: 20,
        paddingBottom: 5,
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
});
