import React from "react";
import { Appbar } from "react-native-paper";

const AddTaskHeader = ({
    navigation,
    showPicker,
    handleAddTask,
    newTaskTitle,
    clearFields,
    theme,
    showModal,
}) => {
    return (
        <Appbar.Header style={{ backgroundColor: theme.colorAccentPrimary }}>
            <Appbar.BackAction
                onPress={() => {
                    navigation.goBack();
                    clearFields();
                }}
            />
            <Appbar.Content title="Add Task" />
            <Appbar.Action icon="alarm" onPress={showPicker} />
            <Appbar.Action icon="account-multiple-plus" onPress={showModal} />
            <Appbar.Action
                icon="check"
                onPress={handleAddTask}
                disabled={newTaskTitle === "" ? true : false}
            />
        </Appbar.Header>
    );
};

export default AddTaskHeader;
