import React, { useState, useCallback } from "react";
import {
    StyleSheet,
    View,
    ToastAndroid,
    FlatList,
    RefreshControl,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Provider, FAB, Portal } from "react-native-paper";

import { getAllTasks } from "../../utils/firebase";

import CustomHeader from "./Components/Header";
import TaskCard from "./Components/TaskCard";
import SlideUpPanel from "./Components/SlideUpPanel";
import Colors from "../../theming/colors";

export default function Home({ navigation }) {
    const [tasksList, setTasksList] = useState([]);
    const [sorting, setSorting] = useState({
        sortMode: "createdAt",
        sortOrder: "desc",
    });
    const { sortMode, sortOrder } = sorting;
    const [completedFilter, setCompletedFilter] = useState(false);
    const [priorityFilter, setPriorityFilter] = useState(0);

    // Refresh Control
    const [refreshing, setRefreshing] = useState(true);
    const onRefresh = async () => {
        setRefreshing(true);
        ToastAndroid.show("Updating your tasks", ToastAndroid.SHORT);
        getTasks(sortMode, sortOrder);
    };

    const getTasks = async () => {
        let list = await getAllTasks(sortMode, sortOrder);
        completedFilter &&
            (list = list.filter((item) => item.isCompleted === true));
        priorityFilter !== 0 &&
            (list = list.filter((item) => item.priorityIs === priorityFilter));
        setTasksList(list);
        setRefreshing(false);
    };

    useFocusEffect(
        useCallback(() => {
            getTasks(sortMode, sortOrder);
        }, [sortMode, sortOrder, completedFilter, priorityFilter])
    );

    const handleSync = async () => {
        setRefreshing(true);
        await getTasks(sortMode, sortOrder);
        ToastAndroid.show("Synced with cloud storage", ToastAndroid.SHORT);
    };

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

    const renderTaskCard = ({ item }) => (
        <TaskCard navigation={navigation} taskItem={item} />
    );

    return (
        <Provider>
            <CustomHeader
                navigation={navigation}
                handleSlider={() => _panel.show()}
                handleSync={handleSync}
            />

            <View style={styles.flatListContainer}>
                <FlatList
                    removeClippedSubviews={true}
                    data={tasksList}
                    extraData={sortMode}
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
