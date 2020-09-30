import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, ToastAndroid, FlatList } from "react-native";
import { Provider, Portal, FAB } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";

// Firebase
import firebase from "../../../firebaseConfig";
import "firebase/firestore";
import { unloadUser } from "../../utils/firebase";

// Custom Components
import CustomHeader from "./Components/Header";
import TaskCard from "./Components/TaskCard";
import SlideUpPanel from "./Components/SlideUpPanel";
import SyncButton from "./Components/SyncButton";
import AddTaskButton from "./Components/AddTaskButton";
import Colors from "../../theming/colors";

export default function Home({ navigation }) {
    // List of tasks
    const [tasksList, setTasksList] = useState([]);
    const [tasksList2, setTasksList2] = useState([]);
    const [tasksList3, setTasksList3] = useState([]);

    // Sets false after getting tasks
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [loading3, setLoading3] = useState(true);

    // Sync button animation
    const [menuToggled, setMenuToggled] = useState(false);

    // Set sort mode and order
    const [sortMode, setSortMode] = useState("createdAt");
    const [sortOrder, setSortOrder] = useState("desc");

    const [state, setState] = useState({ open: false });

    useFocusEffect(
        useCallback(() => {
            navigation.addListener("beforeRemove", (e) => {
                e.preventDefault();
            });
            getTasks(sortMode, sortOrder);
        }, [])
    );

    const onStateChange = ({ open }) => setState({ open });

    const { open } = state;

    /**
     * TODO render single flatlist for all sort methods
     */
    const getTasks = async (sortBy, sortOrder) => {
        const dbRef = firebase
            .firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .collection("tasks");

        await dbRef.orderBy(sortBy, sortOrder).onSnapshot((querySnapshot) => {
            let list = [];
            querySnapshot.forEach((doc) => {
                const {
                    taskTitle,
                    taskTime,
                    taskContent,
                    createdAt,
                    priorityIs,
                    isCompleted,
                    isUpdated,
                } = doc.data();

                list.push({
                    id: doc.id,
                    taskTitle,
                    taskTime,
                    taskContent,
                    createdAt,
                    priorityIs,
                    isCompleted,
                    isUpdated,
                });
            });

            if (sortMode === "createdAt") {
                setTasksList(list);
                setLoading(false);
            } else if (sortMode === "priorityIs") {
                setTasksList2(list);
                setLoading2(false);
            } else if (sortMode === "taskTime") {
                setTasksList3(list);
                setLoading3(false);
            }
        });
    };

    const handleSyncButton = async () => {
        await getTasks(sortMode, sortOrder);
        ToastAndroid.show("Synced with cloud storage", ToastAndroid.SHORT);
        if (menuToggled) {
            setMenuToggled(false);
        } else {
            setMenuToggled(true);
        }
    };

    const handleSortByPriority = async () => {
        await setSortMode("priorityIs");
        await setSortOrder("asc");
        getTasks(sortMode, sortOrder);
    };

    const handleSortByDueAt = async () => {
        await setSortMode("taskTime");
        await setSortOrder("asc");
        getTasks(sortMode, sortOrder);
    };

    const handleSortByCreatedAt = async () => {
        await setSortMode("createdAt");
        await setSortOrder("desc");
        getTasks(sortMode, sortOrder);
    };

    const handleRef = (c) => (_panel = c);
    return (
        <Provider>
            <CustomHeader
                navigation={navigation}
                handleSlider={() => _panel.show()}
                handleSync={handleSyncButton}
            />
            <View style={styles.flatListContainer}>
                {!loading && sortMode === "createdAt" && (
                    <FlatList
                        data={tasksList}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <TaskCard navigation={navigation} taskItem={item} />
                        )}
                    />
                )}
                {!loading2 && sortMode === "priorityIs" && (
                    <FlatList
                        data={tasksList2}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <TaskCard navigation={navigation} taskItem={item} />
                        )}
                    />
                )}
                {!loading3 && sortMode === "taskTime" && (
                    <FlatList
                        data={tasksList3}
                        extraData={tasksList3}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <TaskCard navigation={navigation} taskItem={item} />
                        )}
                    />
                )}

                <FAB.Group
                    open={open}
                    color="white"
                    fabStyle={{ backgroundColor: Colors.accentColor }}
                    icon={open ? "sync" : "plus"}
                    actions={[
                        {
                            icon: "sync",
                            color: Colors.accentColor,
                            label: "Sync Tasks",
                            onPress: () => handleSyncButton(),
                        },
                        {
                            icon: "plus",
                            color: Colors.accentColor,
                            label: "Add Task",
                            onPress: () => navigation.navigate("Add Task"),
                        },
                    ]}
                    onStateChange={onStateChange}
                />
            </View>
            <Portal>
                <SlideUpPanel
                    handleSortByCreatedAt={handleSortByCreatedAt}
                    handleSortByDueAt={handleSortByDueAt}
                    handleSortByPriority={handleSortByPriority}
                    sortMode={sortMode}
                    handleRef={handleRef}
                />
            </Portal>
        </Provider>
    );
}

const styles = StyleSheet.create({
    flatListContainer: {
        flex: 1,
        paddingVertical: 5,
        backgroundColor: "#FAFAFA",
    },
});
