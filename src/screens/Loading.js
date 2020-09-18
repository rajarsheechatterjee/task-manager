// import React, { useState } from "react";

// import {
//     StyleSheet,
//     Text,
//     View,
//     TextInput,
//     Button,
//     ActivityIndicator,
// } from "react-native";

// import firebase from "firebase";

// export default Loading = () => {
//     const [loggedIn, setLoggenIn] = useState(false);

//     const checkIfLoggenIn = () => {
//         firebase.auth().onAuthStateChanged(function (user) {
//             if (user) {
//                 setLoggenIn(true);
//             }
//         });
//     };

//     return (
//         <View style={styles.container}>
//             <ActivityIndicator size="large" />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#fff",
//         alignItems: "center",
//         justifyContent: "center",
//     },
// });
