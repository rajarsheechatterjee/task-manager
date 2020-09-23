import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Animated,
    ToastAndroid,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import TaskCard from "./Components/TaskCard";
import Colors from "../../theming/colors";

import firebase from "../../../firebaseConfig";
import "firebase/firestore";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ripple from "react-native-material-ripple";

export default function Home({ navigation }) {
    const [tasksList, setTasksList] = useState([]);
    // const [tasksList2, setTasksList2] = useState([]);
    // const [tasksList3, setTasksList3] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [loading2, setLoading2] = useState(true);
    // const [loading3, setLoading3] = useState(true);
    const [menuToggled, setMenuToggled] = useState(false);
    const [sortMode, setSortMode] = useState("createdAt");
    const [sortOrder, setSortOrder] = useState("desc");

    const getTasks = async (sortBy, sortOrder) => {
        const dbRef = firebase
            .firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .collection("tasks");

        await dbRef.orderBy(sortBy, sortOrder).onSnapshot((querySnapshot) => {
            const list = [];
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

    const logoStyles = [styles.logoStyle];

    // Sync button animation
    if (menuToggled !== null) {
        const animation = new Animated.Value(menuToggled ? 0 : 1);

        Animated.timing(animation, {
            toValue: menuToggled ? 1 : 0,
            duration: 200,
            useNativeDriver: true,
        }).start();

        const rotateInterpolate = animation.interpolate({
            inputRange: [0, 1],
            outputRange: ["0deg", "360deg"],
        });
        const animatedStyles = { transform: [{ rotate: rotateInterpolate }] };
        logoStyles.push(animatedStyles);
    }

    const handleOnPress = () => {
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

    const handleToast = () => {
        ToastAndroid.show("Synced with cloud storage", ToastAndroid.SHORT);
    };

    return (
        <View style={{ flex: 1, paddingVertical: 5 }}>
            {/* <View style={styles.sortContainer}>
                <View style={{ flex: 1, paddingVertical: 7 }}>
                    <Text style={styles.sortContainerText}>Sort By</Text>
                </View>
                <Ripple
                    onPress={async () => {
                        handleSortByPriority();
                    }}
                    style={{
                        flex: 1,
                        paddingHorizontal: 5,
                        paddingVertical: 7,
                        flexDirection: "row",
                    }}
                >
                    <Text style={styles.sortContainerText}>Priority</Text>
                    {sortMode === "priorityIs" && (
                        <MaterialCommunityIcons
                            name="arrow-up"
                            color="blue"
                            size={18}
                            style={{ paddingTop: 1, paddingLeft: 5 }}
                        />
                    )}
                </Ripple>

                <Ripple
                    onPress={async () => {
                        handleSortByDueAt();
                    }}
                    style={{
                        flex: 1,
                        paddingHorizontal: 5,
                        paddingVertical: 7,
                        flexDirection: "row",
                    }}
                >
                    <Text style={styles.sortContainerText}>Due Time</Text>
                    {sortMode === "taskTime" && (
                        <MaterialCommunityIcons
                            name="arrow-up"
                            color="blue"
                            size={18}
                            style={{ paddingTop: 1, paddingLeft: 5 }}
                        />
                    )}
                </Ripple>

                <Ripple
                    onPress={() => handleSortByCreatedAt()}
                    style={{
                        flex: 1,
                        paddingHorizontal: 5,
                        paddingVertical: 7,
                        flexDirection: "row",
                    }}
                >
                    <Text style={styles.sortContainerText}>Created On</Text>
                    {sortMode === "createdAt" && (
                        <MaterialCommunityIcons
                            name="arrow-down"
                            color="blue"
                            size={18}
                            style={{ paddingTop: 1, paddingLeft: 5 }}
                        />
                    )}
                </Ripple>
            </View> */}
            {!loading && sortMode === "createdAt" && (
                <FlatList
                    style={{ flex: 1 }}
                    data={tasksList}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TaskCard navigation={navigation} taskItem={item} />
                    )}
                />
            )}
            {/* {!loading2 && sortMode === "priorityIs" && (
                <FlatList
                    style={{ flex: 1 }}
                    data={tasksList2}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TaskCard navigation={navigation} taskItem={item} />
                    )}
                />
            )}
            {!loading3 && sortMode === "taskTime" && (
                <FlatList
                    style={{ flex: 1 }}
                    data={tasksList3}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TaskCard navigation={navigation} taskItem={item} />
                    )}
                />
            )} */}

            <View style={styles.syncButtonWrapper}>
                <TouchableHighlight
                    style={[{ opacity: 0.8 }, styles.button]}
                    onPress={async () => {
                        await getTasks(sortMode, sortOrder);
                        handleOnPress();
                        handleToast();
                    }}
                    activeOpacity={0.6}
                    underlayColor="#DDDDDD"
                >
                    <Animated.View style={logoStyles}>
                        <MaterialCommunityIcons
                            name="cached"
                            color={Colors.accentColor}
                            size={32}
                            style={styles.icon}
                        />
                    </Animated.View>
                </TouchableHighlight>
            </View>

            <View style={styles.buttonWrapper}>
                <Ripple
                    style={[
                        styles.button,
                        { backgroundColor: Colors.accentColor },
                    ]}
                    onPress={() => navigation.navigate("Add New Task")}
                >
                    <MaterialCommunityIcons
                        name="plus"
                        color="white"
                        size={32}
                        style={styles.icon}
                    />
                </Ripple>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    sortContainer: {
        marginBottom: 5,
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "space-around",
    },
    sortContainerText: {
        color: Colors.subTextColor,
        fontWeight: "700",
        textAlign: "center",
    },
    buttonWrapper: {
        position: "absolute",
        bottom: 20,
        right: 20,
    },
    syncButtonWrapper: {
        position: "absolute",
        bottom: 20,
        left: 20,
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
        width: 60,
        height: 60,
        backgroundColor: "white",
    },
    icon: {
        marginRight: -2,
        marginTop: -2,
    },
});
