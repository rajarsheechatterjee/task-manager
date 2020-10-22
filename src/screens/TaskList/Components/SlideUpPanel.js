import React from "react";
import { StyleSheet, View, Text, Animated } from "react-native";

import Colors from "../../../theming/colors";

import { TouchableRipple, Checkbox } from "react-native-paper";
import SlidingUpPanel from "rn-sliding-up-panel";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const SlideUpPanel = ({
    handleSortByCreatedAt,
    handleSortByDueAt,
    handleSortByPriority,
    handleFilter,
    sortMode,
    sortOrder,
    filter,
    handleRef,
}) => {
    return (
        <SlidingUpPanel
            animatedValue={new Animated.Value(0)}
            ref={handleRef}
            draggableRange={{ top: 280, bottom: 0 }}
            snappingPoints={[0, 50, 280]}
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
                                name={
                                    sortOrder === "asc"
                                        ? "arrow-up"
                                        : "arrow-down"
                                }
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
                                name={
                                    sortOrder === "asc"
                                        ? "arrow-up"
                                        : "arrow-down"
                                }
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
                                name={
                                    sortOrder === "asc"
                                        ? "arrow-up"
                                        : "arrow-down"
                                }
                                size={25}
                                style={styles.sortArrow}
                            />
                        )}
                    </>
                </TouchableRipple>
                <Text style={[styles.priorityHeading, { paddingTop: 5 }]}>
                    Filter
                </Text>
                <TouchableRipple
                    style={styles.setCompleted}
                    onPress={() => handleFilter()}
                >
                    <>
                        <Checkbox
                            status={filter ? "checked" : "unchecked"}
                            onValueChange={() => handleFilter()}
                            color={Colors.accentColor}
                        />
                        <Text style={{ fontSize: 15, marginLeft: 10 }}>
                            Completed
                        </Text>
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
        paddingTop: 20,
        paddingBottom: 8,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        elevation: 16,
    },
    priorityHeading: {
        fontWeight: "bold",
        fontSize: 15,
        color: Colors.accentColor,
        paddingHorizontal: 20,
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
        paddingHorizontal: 20,
        height: 50,
    },
    setCompleted: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
});
