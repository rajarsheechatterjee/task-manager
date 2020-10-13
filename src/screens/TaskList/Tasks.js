import React, { useState, useLayoutEffect } from "react";
import { StyleSheet, View, ToastAndroid, FlatList } from "react-native";
import { Provider, Portal, FAB, ActivityIndicator } from "react-native-paper";

import firebase from "../../../firebaseConfig";
import "firebase/firestore";

import CustomHeader from "./Components/Header";
import TaskCard from "./Components/TaskCard";
import SlideUpPanel from "./Components/SlideUpPanel";
import Colors from "../../theming/colors";

export default function Home({ navigation }) {
    // Tasks list
    const [tasksList, setTasksList] = useState([]);
    const [tasksList2, setTasksList2] = useState([]);
    const [tasksList3, setTasksList3] = useState([]);
    const [loading, setLoading] = useState(true);

    // Set sort mode and order
    const [sortType, setSortType] = useState({
        sortMode: "createdAt",
        sortOrder: "desc",
    });
    const { sortMode, sortOrder } = sortType;

    useLayoutEffect(() => {
        navigation.addListener("beforeRemove", (e) => {
            e.preventDefault();
        });
        getTasks(sortMode, sortOrder);
    }, [sortMode]);

    // Bottom Slider Sheet
    const [state, setState] = useState({ open: false });
    const onStateChange = ({ open }) => setState({ open });
    const { open } = state;
    const handleRef = (c) => (_panel = c);

    /**
     * TODO render single flatlist for all sort methods
     */

    const getTasks = async (sortBy, sortOrder) => {
        const dbRef = firebase
            .firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .collection("tasks");

        dbRef.orderBy(sortBy, sortOrder).onSnapshot((querySnapshot) => {
            let list = [];
            querySnapshot.forEach((doc) => {
                list.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });

            if (sortMode === "createdAt") {
                setTasksList(list);
            } else if (sortMode === "priorityIs") {
                setTasksList2(list);
            } else if (sortMode === "taskTime") {
                setTasksList3(list);
            }
            setLoading(false);
        });
    };

    const handleSyncButton = async () => {
        await getTasks(sortMode, sortOrder);
        ToastAndroid.show("Synced with cloud storage", ToastAndroid.SHORT);
    };

    const handleSortByPriority = () => {
        setSortType({ sortMode: "priorityIs", sortOrder: "asc" });
        getTasks(sortMode, sortOrder);
    };

    const handleSortByDueAt = () => {
        setSortType({ sortMode: "taskTime", sortOrder: "asc" });
        getTasks(sortMode, sortOrder);
    };

    const handleSortByCreatedAt = () => {
        setSortType({ sortMode: "createdAt", sortOrder: "desc" });
        getTasks(sortMode, sortOrder);
    };

    return (
        <Provider>
            <CustomHeader
                navigation={navigation}
                handleSlider={() => _panel.show()}
                handleSync={handleSyncButton}
            />
            {loading ? (
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <ActivityIndicator color={Colors.accentColor} />
                </View>
            ) : (
                <View style={styles.flatListContainer}>
                    {sortMode === "createdAt" && (
                        <FlatList
                            data={tasksList}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <TaskCard
                                    navigation={navigation}
                                    taskItem={item}
                                />
                            )}
                        />
                    )}
                    {sortMode === "priorityIs" && (
                        <FlatList
                            data={tasksList2}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <TaskCard
                                    navigation={navigation}
                                    taskItem={item}
                                />
                            )}
                        />
                    )}
                    {sortMode === "taskTime" && (
                        <FlatList
                            data={tasksList3}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <TaskCard
                                    navigation={navigation}
                                    taskItem={item}
                                />
                            )}
                        />
                    )}
                </View>
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
        backgroundColor: Colors.background,
    },
});
