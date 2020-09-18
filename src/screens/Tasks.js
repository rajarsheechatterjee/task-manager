import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import firebase from "../../firebase";
import "firebase/firestore";

import moment from "moment";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function Home({ navigation }) {
    const [tasksList, setTasksList] = useState([]);
    const [loading, setLoading] = useState(true);

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
                    isCompleted,
                    isUpdated,
                } = doc.data();

                list.push({
                    id: doc.id,
                    taskTitle,
                    taskTime,
                    taskContent,
                    createdAt,
                    isCompleted,
                    isUpdated,
                });
                setTasksList(list);
                setLoading(false);
            });
        });
    }

    function updateIsCompleted(isCompleted, taskId) {
        const dbRef = firebase
            .firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .collection("tasks");

        if (isCompleted) {
            dbRef.doc(taskId).update({ isCompleted: false });
        } else {
            dbRef.doc(taskId).update({ isCompleted: true });
        }
    }

    return (
        <View style={{ flex: 1 }}>
            {!loading && (
                <FlatList
                    style={{ flex: 1 }}
                    data={tasksList}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.mainContainer}>
                            <View style={styles.taskListView}>
                                <View style={styles.checkbox}>
                                    <TouchableHighlight
                                        style={[{ opacity: 1 }, styles.button2]}
                                        onPress={() =>
                                            updateIsCompleted(
                                                item.isCompleted,
                                                item.id
                                            )
                                        }
                                        activeOpacity={0.6}
                                        underlayColor="#DDDDDD"
                                    >
                                        <MaterialCommunityIcons
                                            name={
                                                item.isCompleted
                                                    ? "check-circle-outline"
                                                    : "checkbox-blank-circle-outline"
                                            }
                                            color="#118086"
                                            size={25}
                                            style={styles.icon}
                                        />
                                    </TouchableHighlight>
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
                    onPress={() => getTasks()}
                    activeOpacity={0.6}
                    underlayColor="#DDDDDD"
                >
                    <MaterialCommunityIcons
                        name="cached"
                        color="#118086"
                        size={32}
                        style={styles.icon}
                    />
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
    taskListView: {
        flex: 1,
        marginTop: 10,
        backgroundColor: "#fff",
        // elevation: ,
        marginHorizontal: 7,
        borderRadius: 15,
        paddingVertical: 9,
    },
    taskList: {
        // margin: 10,
        paddingTop: 10,
        marginHorizontal: 80,
        fontSize: 18,
        fontWeight: "700",
        color: "#484848",
    },
    taskListDate: {
        // margin: 10,
        paddingBottom: 10,
        marginHorizontal: 80,
        fontSize: 14,
        color: "#767676",
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
        // backgroundColor: "white",
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
        left: 10,
        top: 10,
    },
    deleteContainer: {
        width: 40,
        justifyContent: "center",
        position: "absolute",
        left: 20,
        top: 25,
    },
});
