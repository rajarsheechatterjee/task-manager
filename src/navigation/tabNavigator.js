// import React from "react";
// import "react-native-gesture-handler";
// import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import Colors from "../theming/colors";

// import addTaskStack from "./addTaskNavigator";
// import taskListStack from "./taskListStackNavigator";
// import More from "./moreStackNavigator";

// const Tab = AnimatedTabBarNavigator();

// const tabNavigator = () => {
//     return (
//         <Tab.Navigator
//             activeColor={Colors.accentColor}
//             tabBarOptions={{
//                 activeTintColor: "#fff",
//                 keyboardHidesTabBar: true,
//                 activeBackgroundColor: Colors.accentColor,
//             }}
//             appearence={{ dotSize: "small" }}
//         >
//             <Tab.Screen
//                 name="Your Tasks"
//                 component={taskListStack}
//                 options={{
//                     tabBarIcon: ({ color }) => (
//                         <MaterialCommunityIcons
//                             name="format-list-bulleted"
//                             color={color}
//                             size={22}
//                         />
//                     ),
//                 }}
//             />
//             <Tab.Screen
//                 name="Add Task"
//                 component={addTaskStack}
//                 options={{
//                     tabBarIcon: ({ color }) => (
//                         <MaterialCommunityIcons
//                             name="pencil-plus"
//                             color={color}
//                             size={22}
//                         />
//                     ),
//                 }}
//             />
//             <Tab.Screen
//                 name="More"
//                 component={More}
//                 options={{
//                     tabBarIcon: ({ color }) => (
//                         <MaterialCommunityIcons
//                             name="dots-horizontal"
//                             color={color}
//                             size={24}
//                         />
//                     ),
//                 }}
//             />
//         </Tab.Navigator>
//     );
// };

// export default tabNavigator;
