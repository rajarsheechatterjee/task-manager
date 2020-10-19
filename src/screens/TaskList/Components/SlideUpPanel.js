import React from "react";
import { StyleSheet, View, Text } from "react-native";

import Colors from "../../../theming/colors";
import SlidingUpPanel from "rn-sliding-up-panel";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { List, TouchableRipple } from "react-native-paper";

const SlideUpPanel = ({
    handleSortByCreatedAt,
    handleSortByDueAt,
    handleSortByPriority,
    sortMode,
    handleRef,
}) => {
    return (
        <SlidingUpPanel
            ref={handleRef}
            draggableRange={{ top: 200, bottom: 0 }}
            snappingPoints={[0, 200]}
            showBackdrop={false}
        >
            <View style={styles.sliderContainer}>
                <View style={styles.indicator} />
                <Text style={styles.priorityHeading}>Sort</Text>
                <TouchableRipple
                    style={styles.setPriority}
                    onPress={() => handleSortByCreatedAt()}
                >
                    <>
                        <Text style={{ fontSize: 15 }}>Sort by created at</Text>
                        {sortMode === "createdAt" && (
                            <MaterialCommunityIcons
                                color={Colors.accentColor}
                                name="arrow-down"
                                size={25}
                                style={styles.sortArrow}
                            />
                        )}
                    </>
                </TouchableRipple>
                <TouchableRipple
                    style={styles.setPriority}
                    onPress={() => handleSortByPriority()}
                >
                    <>
                        <Text style={{ fontSize: 15 }}>Sort by priority</Text>
                        {sortMode === "priorityIs" && (
                            <MaterialCommunityIcons
                                color={Colors.accentColor}
                                name="arrow-down"
                                size={25}
                                style={styles.sortArrow}
                            />
                        )}
                    </>
                </TouchableRipple>
                <TouchableRipple
                    style={styles.setPriority}
                    onPress={() => handleSortByDueAt()}
                >
                    <>
                        <Text style={{ fontSize: 15 }}>
                            Sort by due time at
                        </Text>
                        {sortMode === "taskTime" && (
                            <MaterialCommunityIcons
                                color={Colors.accentColor}
                                name="arrow-up"
                                size={25}
                                style={styles.sortArrow}
                            />
                        )}
                    </>
                </TouchableRipple>
            </View>
        </SlidingUpPanel>
    );
};

export default SlideUpPanel;

const styles = StyleSheet.create({
    sliderContainer: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: 17,
        paddingBottom: 8,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        elevation: 16,
    },
    priorityHeading: {
        fontWeight: "bold",
        fontSize: 15,
        color: Colors.accentColor,
        paddingHorizontal: 16,
        paddingBottom: 5,
    },
    indicator: {
        backgroundColor: "rgba(0,0,0,0.75)",
        height: 5,
        width: 40,
        borderRadius: 4,
        alignSelf: "center",
        position: "absolute",
        marginTop: 7,
    },
    sortArrow: {
        paddingTop: 3,
        paddingRight: 5,
    },
    setPriority: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        height: 50,
    },
});
