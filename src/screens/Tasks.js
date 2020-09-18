import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Animated,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { CheckBox } from "react-native-elements";

import firebase from "../../firebase";
import "firebase/firestore";

import { updateIsCompleted } from "../utils/firebase";
import { priorityColor } from "../utils/priority";

import moment from "moment";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function Home({ navigation }) {
    const [tasksList, setTasksList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [menuToggled, setMenuToggled] = useState(false);

    /**
     * Gets all tasks of a user
     */
    function getTasks() {
        const dbRef = firebase
            .firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .collection("tasks");

        dbRef.orderBy("createdAt", "desc").onSnapshot((querySnapshot) => {
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
                setTasksList(list);
                setLoading(false);
            });
        });
    }

    function sortByPriority() {
        const dbRef = firebase
            .firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .collection("tasks");

        dbRef.orderBy("priorityIs", "asc").onSnapshot((querySnapshot) => {
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
                setTasksList(list);
                setLoading(false);
            });
        });
    }

    function sortByDueAt() {
        const dbRef = firebase
            .firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .collection("tasks");

        dbRef.orderBy("taskTime", "asc").onSnapshot((querySnapshot) => {
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
                setTasksList(list);
                setLoading(false);
            });
        });
    }
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

    return (
        <View style={{ flex: 1, paddingBottom: 5 }}>
            <View style={styles.sortContainer}>
                <Text
                    style={styles.sortContainerText}
                    onPress={() => sortByPriority()}
                >
                    Sort By Priority
                </Text>
                <Text> | </Text>
                <Text
                    style={styles.sortContainerText}
                    onPress={() => sortByDueAt()}
                >
                    Sort By Due At
                </Text>
            </View>
            {!loading && (
                <FlatList
                    style={{ flex: 1 }}
                    data={tasksList}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.mainContainer}>
                            <View style={styles.taskListView}>
                                <View style={styles.checkbox}>
                                    <CheckBox
                                        center
                                        checkedColor="#118086"
                                        uncheckedColor="#118086"
                                        checkedIcon="dot-circle-o"
                                        uncheckedIcon="circle-o"
                                        checked={item.isCompleted}
                                        onPress={() =>
                                            updateIsCompleted(
                                                item.isCompleted,
                                                item.id
                                            )
                                        }
                                        containerStyle={styles.checkBox2}
                                    />
                                </View>
                                <Text
                                    style={[
                                        styles.taskList,
                                        item.isCompleted && {
                                            textDecorationLine: "line-through",
                                        },
                                    ]}
                                >
                                    {item.taskTitle}
                                </Text>
                                <Text
                                    style={[
                                        styles.taskListDate,
                                        item.isCompleted && {
                                            textDecorationLine: "line-through",
                                        },
                                    ]}
                                >
                                    {item.isUpdated && "Updated on "}
                                    {moment(item.createdAt.toDate()).calendar()}
                                </Text>
                                <View style={styles.taskListDate2}>
                                    <View
                                        style={[
                                            styles.taskPriority,
                                            priorityColor(item.priorityIs),
                                        ]}
                                    />
                                </View>
                                <View style={styles.buttonWrapper3}>
                                    <TouchableHighlight
                                        style={[{ opacity: 1 }, styles.button2]}
                                        onPress={() =>
                                            navigation.navigate(
                                                "TaskItem",
                                                item
                                            )
                                        }
                                        activeOpacity={0.6}
                                        underlayColor="#DDDDDD"
                                    >
                                        <MaterialCommunityIcons
                                            name="chevron-right"
                                            color="#118086"
                                            size={30}
                                            style={styles.icon}
                                        />
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </View>
                    )}
                />
            )}

            <View style={styles.buttonWrapper2}>
                <TouchableHighlight
                    style={[{ opacity: 0.8 }, styles.button]}
                    onPress={() => {
                        handleOnPress();
                        getTasks();
                    }}
                    activeOpacity={0.6}
                    underlayColor="#DDDDDD"
                >
                    <Animated.View style={logoStyles}>
                        <MaterialCommunityIcons
                            name="cached"
                            color="#118086"
                            size={32}
                            style={styles.icon}
                        />
                    </Animated.View>
                </TouchableHighlight>
            </View>

            <View style={styles.buttonWrapper}>
                <TouchableHighlight
                    style={[{ opacity: 0.8 }, styles.button]}
                    onPress={() => navigation.navigate("Add New Task")}
                    activeOpacity={0.6}
                    underlayColor="#DDDDDD"
                >
                    <MaterialCommunityIcons
                        name="plus"
                        color="#118086"
                        size={32}
                        style={styles.icon}
                    />
                </TouchableHighlight>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {},
    sortContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 5,
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "space-around",
    },
    sortContainerText: { color: "#484848", fontWeight: "700" },
    taskListView: {
        flex: 1,
        marginVertical: 5,
        backgroundColor: "#fff",
        marginHorizontal: 7,
        borderRadius: 15,
        paddingVertical: 9,
    },
    taskList: {
        paddingTop: 10,
        marginHorizontal: 80,
        fontSize: 18,
        fontWeight: "700",
        color: "#484848",
    },
    taskListDate: {
        marginBottom: 10,
        marginHorizontal: 80,
        fontSize: 14,
        color: "#767676",
    },
    taskListDate2: {
        position: "absolute",
        left: 65,
        top: 17,
    },
    buttonWrapper: {
        position: "absolute",
        bottom: 20,
        right: 20,
    },
    buttonWrapper2: {
        position: "absolute",
        bottom: 20,
        left: 20,
    },
    buttonWrapper3: {
        position: "absolute",
        right: 25,
        top: 10,
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
        width: 60,
        height: 60,
        backgroundColor: "white",
    },
    button2: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
        width: 60,
        height: 60,
    },
    icon: {
        marginRight: -2,
        marginTop: -2,
    },
    rightIcon: {
        position: "absolute",
        right: 40,
        top: 20,
    },
    checkbox: {
        position: "absolute",
        left: 8,
        top: 14,
    },
    deleteContainer: {
        width: 40,
        justifyContent: "center",
        position: "absolute",
        left: 20,
        top: 25,
    },

    taskPriority: {
        marginTop: 5,
        width: 4,
        height: 40,
        borderRadius: 9999,
        borderWidth: 1,
    },
    checkBox2: {
        borderRadius: 10,
        backgroundColor: "transparent",
        borderWidth: 0,
    },
});
