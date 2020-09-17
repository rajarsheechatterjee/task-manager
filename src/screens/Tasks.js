import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    Button,
    TouchableOpacity,
    TouchableHighlight,
} from "react-native";
import moment from "moment";
import { useFocusEffect } from "@react-navigation/native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import firebase from "../../firebase";

import "firebase/firestore";
import { FlatList } from "react-native-gesture-handler";

export default function Home({ navigation }) {
    const [tasksList, setTasksList] = useState([]);
    const [loading, setLoading] = useState(true);

    // useFocusEffect(
    //     React.useCallback(() => {
    //         getTasks();
    //     })
    // );

    // useEffect(() => {
    //     let mounted = true;
    //     getTasks();
    //     return () => {
    //         return () => (mounted = false);
    //     };
    // }, [getTasks]);

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
                } = doc.data();

                list.push({
                    id: doc.id,
                    taskTitle,
                    taskTime,
                    taskContent,
                    createdAt,
                });
                setTasksList(list);
                setLoading(false);
            });
        });
    }

    return (
        <View style={{ flex: 1 }}>
            {/* <Button title="Sync your tasks" onPress={() => getTasks()} /> */}

            {!loading && (
                <FlatList
                    style={{ flex: 1 }}
                    data={tasksList}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate("TaskItem", item)
                            }
                        >
                            <View style={styles.taskListView}>
                                {/* <View style={styles.deleteContainer}>
                                    <TouchableOpacity>
                                        <MaterialCommunityIcons
                                            size={30}
                                            name="check-circle-outline"
                                            color="#FF5A5F"
                                        />
                                    </TouchableOpacity>
                                </View> */}
                                <Text style={styles.taskList}>
                                    {item.taskTitle}
                                </Text>
                                <Text style={styles.taskListDate}>
                                    {moment(item.createdAt.toDate()).calendar()}
                                </Text>

                                <MaterialCommunityIcons
                                    name="chevron-right"
                                    color="#118086"
                                    size={30}
                                    style={styles.rightIcon}
                                />
                            </View>
                        </TouchableOpacity>
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
    txtinpt: {
        borderWidth: 1,
        margin: 10,
        borderRadius: 10,
    },
    taskListView: {
        flex: 1,
        // position: "relative",
        backgroundColor: "#f4f4f4",
        paddingVertical: 10,
    },
    taskList: {
        // margin: 10,
        paddingTop: 10,
        paddingHorizontal: 60,
        fontSize: 18,
        fontWeight: "700",
        color: "#484848",
    },
    taskListDate: {
        // margin: 10,
        paddingBottom: 10,
        paddingHorizontal: 60,
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
    rightIcon: {
        position: "absolute",
        right: 40,
        top: 20,
    },
    deleteContainer: {
        width: 40,
        justifyContent: "center",
        position: "absolute",
        left: 20,
        top: 25,
    },
});
