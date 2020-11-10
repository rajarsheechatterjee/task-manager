import React from "react";
import { Appbar } from "react-native-paper";

const AddTaskHeader = ({
    navigation,
    handleRef,
    showPicker,
    handleAddTask,
    newTaskTitle,
    clearFields,
    theme,
    showModal,
}) => {
    return (
        <Appbar.Header style={{ backgroundColor: theme.accentColor }}>
            <Appbar.BackAction
                onPress={() => {
                    navigation.goBack();
                    clearFields();
                }}
            />
            <Appbar.Content title="Add Task" />
            <Appbar.Action icon="alarm" onPress={showPicker} />
            <Appbar.Action icon="account-multiple-plus" onPress={showModal} />
            <Appbar.Action icon="priority-high" onPress={handleRef} />
            <Appbar.Action
                icon="check"
                onPress={handleAddTask}
                disabled={newTaskTitle === "" ? true : false}
            />
        </Appbar.Header>
    );
};

export default AddTaskHeader;
