import firebase from "../../firebaseConfig";
import "firebase/firestore";
import { Alert } from "react-native";

export const auth = firebase.auth();

export const loginUser = async (email, password) => {
    try {
        await firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch((error) => {
                Alert.alert(error.message);
            });
    } catch (error) {
        console.log(error.toString());
    }
};

export const signupUser = async (email, password) => {
    try {
        await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                const userUid = firebase.auth().currentUser.uid;

                firebase.firestore().collection("users").doc(userUid).set({
                    userUid: userUid,
                    userEmail: email,
                });
            })
            .catch((error) => {
                Alert.alert(error.message);
            });
    } catch (error) {
        console.log(error.toString());
    }
};

export const logout = () => {
    firebase.auth().signOut();
};

export const addTask = async (
    navigation,
    taskTitle,
    taskTime,
    taskContent,
    priorityIs,
    collaborators,
    isCompleted = false,
    isUpdated = false
) => {
    const timeStamp = firebase.firestore.Timestamp.fromDate(new Date());

    await firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("tasks")
        .add({
            userId: firebase.auth().currentUser.uid,
            taskTitle: taskTitle,
            taskTime: taskTime,
            taskContent: taskContent,
            createdAt: timeStamp,
            priorityIs: priorityIs,
            collaborators: collaborators,
            isCompleted: isCompleted,
            isUpdated: isUpdated,
        })
        .catch((error) => console.log(error));

    navigation.navigate("Your Tasks");
};

export const addSampleData = async (navigation) => {
    const timeStamp = firebase.firestore.Timestamp.fromDate(new Date());
    const dummyData = {
        userId: firebase.auth().currentUser.uid,
        taskTitle: "Task Title",
        taskTime: timeStamp,
        taskContent: "Task Content",
        createdAt: timeStamp,
        priorityIs: 2,
        collaborators: ["abc@gmail.com"],
        isCompleted: false,
        isUpdated: false,
    };

    await firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("tasks")
        .add(dummyData)
        .catch((error) => console.log(error));

    navigation.navigate("Your Tasks");
};

export const updateTask = async (
    navigation,
    id,
    taskTitle,
    taskTime,
    taskContent,
    taskPriority,
    isCompleted
) => {
    const timeStamp = firebase.firestore.Timestamp.fromDate(new Date());

    await firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("tasks")
        .doc(id)
        .update({
            userId: firebase.auth().currentUser.uid,
            taskTitle: taskTitle,
            taskTime: taskTime,
            taskContent: taskContent,
            createdAt: timeStamp,
            priorityIs: taskPriority,
            isCompleted: isCompleted,
            isUpdated: true,
        })
        .catch((error) => console.log(error));

    navigation.navigate("Your Tasks");
};

export const deleteTask = async (navigation, id) => {
    await firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("tasks")
        .doc(id)
        .delete();

    navigation.navigate("Your Tasks");
};

export const updateIsCompleted = async (isCompleted, taskId) => {
    const dbRef = firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("tasks");

    dbRef.doc(taskId).update({ isCompleted: !isCompleted });
};

export const deleteUser = async (navigation) => {
    const user = firebase.auth().currentUser;

    await firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .delete();

    user.delete()
        .then(function () {
            logout(navigation);
        })
        .catch(function (error) {
            Alert.alert(error.message);
        });
};

export const currentUserEmail = () => {
    return firebase.auth().currentUser.email;
};

export const getAllTasks = async (sortBy, sortOrder) => {
    const dbRef = firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("tasks");

    let list = [];

    const snapshot = await dbRef.orderBy(sortBy, sortOrder).get();
    snapshot.forEach((doc) => {
        list.push({
            id: doc.id,
            ...doc.data(),
        });
    });
    return list;
};
