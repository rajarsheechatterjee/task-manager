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
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";

import { deleteTask, getAllTasks, updateCompleted } from "../../utils/firebase";

import { ThemeContext } from "../../navigation/ThemeProvider";

import AppBar from "./Components/Header";
import TaskCard from "./Components/TaskCard";
import FullCard from "./Components/FullCard";
import BottomSheet from "./Components/BottomSheet";
import Colors from "../../theming/colors";

const TasksList = ({ navigation }) => {
    const { theme } = useContext(ThemeContext);

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

        NetInfo.fetch().then((state) => {
            !state.isConnected &&
                ToastAndroid.show(
                    "Cannot retrieve tasks at this moment. Please check your internet connection",
                    ToastAndroid.SHORT
                );
        });
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

    const [displayMode, setDisplayMode] = useState("compact");

    AsyncStorage.getItem("@cardStyle").then(
        (value) => value && setDisplayMode(JSON.parse(value))
    );

    useFocusEffect(
        useCallback(() => {
            let isMounted = true;

            getTasks(sortMode, sortOrder);

            return () => (isMounted = false);
        }, [sorting, completedFilter, priorityFilter, displayMode])
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

    const handleSetTaskId = (taskId) => setDeleteTaskId(taskId);

    const handleDeleteTask = async () => {
        if (deleteTaskId !== "") {
            setRefreshing(true);
            await deleteTask(navigation, deleteTaskId);
            setDeleteTaskId("");
            getTasks(sortMode, sortOrder);
        }
    };

    const handleDisplayMode = (value) => setDisplayMode(value);

    /**
     * Indivisual task item
     */
    const renderTaskCard = ({ item }) => (
        <TaskCard
            navigation={navigation}
            taskItem={item}
            updateCompleted={updateCompleted}
            onToggleSnackBar={onToggleSnackBar}
            handleSetTaskId={handleSetTaskId}
            onDismissSnackBar={onDismissSnackBar}
        />
    );

    const renderFullCard = ({ item }) => (
        <FullCard
            navigation={navigation}
            taskItem={item}
            updateCompleted={updateCompleted}
            onToggleSnackBar={onToggleSnackBar}
            handleSetTaskId={handleSetTaskId}
            onDismissSnackBar={onDismissSnackBar}
        />
    );

    return (
        <Provider>
            <AppBar
                navigation={navigation}
                handleSlider={() => _panel.show({ velocity: -1.5 })}
                handleSync={handleSync}
            />

            <View
                style={[
                    styles.flatListContainer,
                    { backgroundColor: theme.backgroundColor },
                ]}
            >
                <FlatList
                    removeClippedSubviews={true}
                    data={tasksList}
                    extraData={tasksList}
                    keyExtractor={(item) => item.id}
                    renderItem={
                        displayMode === "fullcard"
                            ? renderFullCard
                            : renderTaskCard
                    }
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={["white"]}
                            progressBackgroundColor={theme.colorAccentSecondary}
                        />
                    }
                />
            </View>
            <FAB
                style={[
                    styles.fab,
                    { backgroundColor: theme.colorAccentSecondary },
                ]}
                icon="plus"
                color={Colors.iconColor}
                onPress={() => navigation.navigate("Add Task")}
            />
            <Portal>
                <BottomSheet
                    sorting={sorting}
                    completedFilter={completedFilter}
                    prioFilter={priorityFilter}
                    handleSorting={handleSorting}
                    handleCompletedFilter={handleCompletedFilter}
                    handlePriorityFilter={handlePriorityFilter}
                    handleRef={(c) => (_panel = c)}
                    handleDisplayMode={handleDisplayMode}
                    displayMode={displayMode}
                />
                <Snackbar
                    visible={visible}
                    onDismiss={onDismissSnackBar}
                    duration={3000}
                    action={{
                        label: "Delete Task",
                        onPress: handleDeleteTask,
                    }}
                    style={{ backgroundColor: theme.colorAccentPrimary }}
                    theme={{ colors: { accent: "white" } }}
                >
                    Task Completed
                </Snackbar>
            </Portal>
        </Provider>
    );
};

export default TasksList;

const styles = StyleSheet.create({
    flatListContainer: {
        flex: 1,
        paddingVertical: 5,
    },
    fab: {
        position: "absolute",
        margin: 16,
        right: 0,
        bottom: 0,
    },
});
