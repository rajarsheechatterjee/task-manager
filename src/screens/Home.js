import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableOpacity,
} from "react-native";

import firebase from "../../firebase";

import "firebase/firestore";
import { FlatList } from "react-native-gesture-handler";

export default function Home({ navigation }) {
    const dbref = firebase.firestore().collection("tasks");

    useEffect(() => {
        dbref
            // .where("userId", "==", firebase.auth().currentUser.uid)
            .orderBy("created", "desc")
            .onSnapshot((querySnapshot) => {
                const list = [];
                querySnapshot.forEach((doc) => {
                    const { task, created } = doc.data();
                    list.push({
                        id: doc.id,
                        task,
                        created,
                    });
                });
                // console.log(list);
                setTasks(list);
                setLoading(false);
            });
    }, []);

    async function logout() {
        await firebase.auth().signOut();
        navigation.navigate("Login");
    }

    const [task1, setTask1] = useState("");
    const [taskss, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    // async function getTasks() {

    // }

    // function printUser() {
    //     firebase.auth().onAuthStateChanged((user) => {
    //         if (user) {
    //             console.log("User id: ", user.uid);
    //         }
    //     });
    // }

    function addTask(task) {
        const t = firebase.firestore.Timestamp.fromDate(new Date());

        dbref
            .add({
                task: task,
                userId: firebase.auth().currentUser.uid,
                created: t,
            })
            .catch((error) => console.log(error));
    }

    return (
        <View style={{ flex: 1 }}>
            <Text>Home</Text>
            <Button title="Sign Out" onPress={() => logout()} />
            <View>
                <TextInput
                    style={styles.txtinpt}
                    onChangeText={(text) => setTask1(text)}
                />
                <Button
                    title="Add"
                    color="coral"
                    onPress={() => addTask(task1)}
                />
            </View>
            {!loading && (
                <FlatList
                    style={{ flex: 1 }}
                    data={taskss}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <Text>
                            {item.task}
                            {/* {new Date(
                                item.created.toDate()
                            ).toLocaleTimeString()} */}
                        </Text>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    txtinpt: {
        borderWidth: 1,
        margin: 10,
        borderRadius: 10,
    },
});
