import React, { useState, useCallback, useContext } from "react";
import {
    StyleSheet,
    View,
    ToastAndroid,
    FlatList,
    RefreshControl,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Provider, FAB, Portal, Snackbar } from "react-native-paper";

import {
    deleteTask,
    getAllTasks,
    updateIsCompleted,
} from "../../utils/firebase";

import { ThemeContext } from "../../navigation/ThemeProvider";

import CustomHeader from "./Components/Header";
import TaskCard from "./Components/TaskCard";
import SlideUpPanel from "./Components/SlideUpPanel";
import Colors from "../../theming/colors";

export default function Home({ navigation }) {
    /**
     * Refresh Control
     */
    const [refreshing, setRefreshing] = useState(true);

    const onRefresh = async () => {
        setRefreshing(true);
        ToastAndroid.show("Updating your tasks", ToastAndroid.SHORT);
        getTasks(sortMode, sortOrder);
    };

    /**
     * Get tasks from cloud storage
     */
    const [tasksList, setTasksList] = useState([]);

    const getTasks = async () => {
        let list = await getAllTasks(sortMode, sortOrder);
        completedFilter &&
            (list = list.filter((item) => item.isCompleted === true));
        priorityFilter !== 0 &&
            (list = list.filter((item) => item.priorityIs === priorityFilter));
        setTasksList(list);
        setRefreshing(false);
    };

    /**
     * Sorting and filters
     */
    const [sorting, setSorting] = useState({
        sortMode: "createdAt",
        sortOrder: "desc",
    });
    const { sortMode, sortOrder } = sorting;
    const [completedFilter, setCompletedFilter] = useState(false);
    const [priorityFilter, setPriorityFilter] = useState(0);
    const [deleteVisible, setDeleteVisible] = useState(false);

    useFocusEffect(
        useCallback(() => {
            getTasks(sortMode, sortOrder);
        }, [sorting, completedFilter, priorityFilter, deleteVisible])
    );

    /**
     * Sync with cloud storage
     */
    const handleSync = async () => {
        setRefreshing(true);
        await getTasks(sortMode, sortOrder);
        ToastAndroid.show("Synced with cloud storage", ToastAndroid.SHORT);
    };

    /**
     * Handle sort and filter settings
     */
    const handleSorting = (sortMode) => {
        setRefreshing(true);
        setSorting({
            sortMode: sortMode,
            sortOrder: sortOrder === "asc" ? "desc" : "asc",
        });
    };

    const handleCompletedFilter = () => {
        setRefreshing(true);
        setCompletedFilter(!completedFilter);
    };

    const handlePriorityFilter = (priority) => {
        setRefreshing(true);
        if (priority === priorityFilter) {
            setPriorityFilter(0);
        } else {
            setPriorityFilter(priority);
        }
    };

    /**
     * Toggle and dismiss snackbar
     */
    const [visible, setVisible] = useState(false);
    const onToggleSnackBar = () => setVisible(true);
    const onDismissSnackBar = () => {
        setVisible(false);
        setDeleteTaskId("");
    };

    /**
     * Delete task from snackbar when completed
     */
    const [deleteTaskId, setDeleteTaskId] = useState();

    const handleSetTaskId = (taskId) => {
        setDeleteTaskId(taskId);
    };

    const handleDeleteTask = async () => {
        if (deleteTaskId !== "") {
            setRefreshing(true);
            await deleteTask(navigation, deleteTaskId);
            setDeleteTaskId("");
            getTasks(sortMode, sortOrder);
        }
    };

    /**
     * Select multiple items
     */
    const [selectedTasks, setSelectedTasks] = useState([]);
    const handleSelectTask = async (taskId) => {
        if (selectedTasks.length > 0) {
            const index = selectedTasks.indexOf(taskId);
            if (index > -1) {
                selectedTasks.splice(index, 1);
            } else {
                selectedTasks.push(taskId);
            }
        } else {
            setDeleteVisible(true);
            selectedTasks.push(taskId);
        }
        setSelectedTasks(selectedTasks);
        if (selectedTasks.length > 0) {
            setDeleteVisible(true);
        } else {
            setDeleteVisible(false);
        }
    };
    const deselectAll = () => {
        setRefreshing(true);
        setSelectedTasks([]);
        setTasksList([]);
        setDeleteVisible(false);
    };

    const deleteSelected = () => {
        setTasksList([]);
        setRefreshing(true);
        selectedTasks.forEach((id) => {
            deleteTask(navigation, id);
        });
        setDeleteVisible(false);
        setSelectedTasks([]);
        ToastAndroid.show("Tasks Deleted", ToastAndroid.SHORT);
    };

    const selectHelper = () => {
        getTasks(sortMode, sortOrder);
    };

    /**
     * Indivisual task item
     */
    const renderTaskCard = ({ item }) => (
        <TaskCard
            navigation={navigation}
            taskItem={item}
            updateIsCompleted={updateIsCompleted}
            onToggleSnackBar={onToggleSnackBar}
            handleSetTaskId={handleSetTaskId}
            onDismissSnackBar={onDismissSnackBar}
            handleSelectTask={handleSelectTask}
            selectHelper={selectHelper}
        />
    );

    return (
        <Provider>
            <CustomHeader
                navigation={navigation}
                handleSlider={() => _panel.show({ velocity: -1.5 })}
                handleSync={handleSync}
                deleteVisible={deleteVisible}
                deleteSelected={deleteSelected}
                deselectAll={deselectAll}
                selectedTasks={selectedTasks}
            />

            <View style={styles.flatListContainer}>
                <FlatList
                    removeClippedSubviews={true}
                    data={tasksList}
                    extraData={tasksList}
                    keyExtractor={(item) => item.id}
                    renderItem={renderTaskCard}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={["white"]}
                            progressBackgroundColor={Colors.accentColor}
                        />
                    }
                />
            </View>
            <FAB
                style={styles.fab}
                icon="plus"
                color={Colors.iconColor}
                onPress={() => navigation.navigate("Add Task")}
            />
            <Portal>
                <SlideUpPanel
                    sorting={sorting}
                    completedFilter={completedFilter}
                    prioFilter={priorityFilter}
                    handleSorting={handleSorting}
                    handleCompletedFilter={handleCompletedFilter}
                    handlePriorityFilter={handlePriorityFilter}
                    handleRef={(c) => (_panel = c)}
                />
                <Snackbar
                    visible={visible}
                    onDismiss={onDismissSnackBar}
                    duration={3000}
                    action={{
                        label: "Delete Task",
                        onPress: handleDeleteTask,
                    }}
                >
                    Task Completed
                </Snackbar>
            </Portal>
        </Provider>
    );
}

const styles = StyleSheet.create({
    flatListContainer: {
        flex: 1,
        paddingVertical: 5,
        backgroundColor: Colors.background,
    },
    fab: {
        position: "absolute",
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: Colors.accentColor,
    },
});
