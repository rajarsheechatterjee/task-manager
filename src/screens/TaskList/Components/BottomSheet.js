import React, { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Colors from "../../../theming/colors";

import {
    TouchableRipple,
    Checkbox,
    Chip,
    RadioButton,
} from "react-native-paper";
import SlidingUpPanel from "rn-sliding-up-panel";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { ThemeContext } from "../../../navigation/ThemeProvider";

const BottomSheet = ({
    handleSorting,
    handleCompletedFilter,
    sorting,
    completedFilter,
    prioFilter,
    handlePriorityFilter,
    handleRef,
    handleDisplayMode,
    displayMode,
}) => {
    const { theme } = useContext(ThemeContext);

    const { sortMode, sortOrder } = sorting;

    return (
        <SlidingUpPanel
            ref={handleRef}
            draggableRange={{ top: 420, bottom: 0 }}
            snappingPoints={[0, 420]}
        >
            <View
                style={[
                    styles.bottomSheetContainer,
                    { backgroundColor: theme.bottomSheet },
                ]}
            >
                <View style={styles.indicator} />
                <Text
                    style={[
                        styles.filterHeading,
                        { color: theme.colorAccentSecondary },
                    ]}
                >
                    Sort
                </Text>
                <TouchableRipple
                    style={styles.setSorting}
                    onPress={() => handleSorting("createdAt")}
                >
                    <>
                        <Text style={{ fontSize: 15, color: theme.textColor }}>
                            Sort by created at
                        </Text>
                        {sortMode === "createdAt" && (
                            <MaterialCommunityIcons
                                color={theme.colorAccentSecondary}
                                name={
                                    sortOrder === "asc"
                                        ? "arrow-down"
                                        : "arrow-up"
                                }
                                size={25}
                                style={styles.sortArrow}
                            />
                        )}
                    </>
                </TouchableRipple>
                <TouchableRipple
                    style={styles.setSorting}
                    onPress={() => handleSorting("priorityIs")}
                >
                    <>
                        <Text style={{ fontSize: 15, color: theme.textColor }}>
                            Sort by priority
                        </Text>
                        {sortMode === "priorityIs" && (
                            <MaterialCommunityIcons
                                color={theme.colorAccentSecondary}
                                name={
                                    sortOrder === "asc"
                                        ? "arrow-down"
                                        : "arrow-up"
                                }
                                size={25}
                                style={styles.sortArrow}
                            />
                        )}
                    </>
                </TouchableRipple>
                <TouchableRipple
                    style={styles.setSorting}
                    onPress={() => handleSorting("taskTime")}
                >
                    <>
                        <Text style={{ fontSize: 15, color: theme.textColor }}>
                            Sort by due time
                        </Text>
                        {sortMode === "taskTime" && (
                            <MaterialCommunityIcons
                                color={theme.colorAccentSecondary}
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
                <Text
                    style={[
                        [
                            styles.filterHeading,
                            { color: theme.colorAccentSecondary },
                        ],
                        { paddingTop: 5 },
                    ]}
                >
                    Filter
                </Text>
                <TouchableRipple
                    style={styles.completedFilter}
                    onPress={() => handleCompletedFilter()}
                >
                    <>
                        <Checkbox
                            status={completedFilter ? "checked" : "unchecked"}
                            onValueChange={() => handleCompletedFilter()}
                            color={theme.colorAccentSecondary}
                            uncheckedColor={theme.textColor}
                        />
                        <Text
                            style={{
                                fontSize: 15,
                                marginLeft: 10,
                                color: theme.textColor,
                            }}
                        >
                            Completed
                        </Text>
                    </>
                </TouchableRipple>
                <Text
                    style={[
                        [
                            styles.filterHeading,
                            { color: theme.colorAccentSecondary },
                        ],
                        { paddingTop: 5 },
                    ]}
                >
                    Display
                </Text>
                <RadioButton.Group
                    onValueChange={(value) => {
                        handleDisplayMode(value);
                        AsyncStorage.setItem(
                            "@cardStyle",
                            JSON.stringify(value)
                        );
                    }}
                    value={displayMode}
                >
                    <View style={{ flexDirection: "row" }}>
                        <RadioButton.Item
                            label="Compact"
                            value="compact"
                            uncheckedColor={theme.colorAccentSecondary}
                            color={theme.colorAccentSecondary}
                            labelStyle={{ color: theme.textColor }}
                            style={{ paddingHorizontal: 20 }}
                        />
                        <RadioButton.Item
                            label="Full Card"
                            value="fullcard"
                            uncheckedColor={theme.colorAccentSecondary}
                            color={theme.colorAccentSecondary}
                            labelStyle={{ color: theme.textColor }}
                            style={{ paddingHorizontal: 20 }}
                        />
                    </View>
                </RadioButton.Group>
                <View style={styles.priorityFilters}>
                    <Chip
                        selectedColor={prioFilter === 1 ? "white" : "black"}
                        style={[
                            { marginRight: 10 },
                            prioFilter === 1 && {
                                backgroundColor: "#A80000",
                            },
                        ]}
                        icon="priority-high"
                        onPress={() => handlePriorityFilter(1)}
                        selected={prioFilter === 1 ? true : false}
                    >
                        High
                    </Chip>
                    <Chip
                        selectedColor={prioFilter === 2 ? "white" : "black"}
                        style={[
                            { marginRight: 10 },
                            prioFilter === 2 && {
                                backgroundColor: Colors.priorityMid,
                            },
                        ]}
                        icon="sort"
                        onPress={() => handlePriorityFilter(2)}
                        selected={prioFilter === 2 ? true : false}
                    >
                        Medium
                    </Chip>
                    <Chip
                        selectedColor={prioFilter === 3 ? "white" : "black"}
                        style={[
                            { marginRight: 10 },
                            prioFilter === 3 && {
                                backgroundColor: Colors.priorityLow,
                            },
                        ]}
                        icon="priority-low"
                        onPress={() => handlePriorityFilter(3)}
                        selected={prioFilter === 3 ? true : false}
                    >
                        Low
                    </Chip>
                </View>
            </View>
        </SlidingUpPanel>
    );
};

export default BottomSheet;

const styles = StyleSheet.create({
    bottomSheetContainer: {
        flex: 1,
        paddingTop: 20,
        paddingBottom: 8,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        elevation: 16,
    },
    filterHeading: {
        fontWeight: "bold",
        fontSize: 15,
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
    setSorting: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        height: 50,
    },
    completedFilter: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    priorityFilters: {
        flexDirection: "row",
        paddingHorizontal: 16,
        paddingVertical: 5,
    },
});
