import React from "react";
import { StyleSheet, View } from "react-native";

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
        >
            <View style={styles.sliderContainer}>
                <View
                    style={{
                        backgroundColor: "#333",
                        height: 6,
                        width: 50,
                        borderRadius: 4,
                        alignSelf: "center",
                        marginTop: 10,
                    }}
                />
                <List.Section>
                    <TouchableRipple
                        style={{ height: 60, paddingTop: 5 }}
                        rippleColor="rgba(0, 0, 0, 0.2)"
                        onPress={() => handleSortByCreatedAt()}
                    >
                        <List.Item
                            titleStyle={{ fontSize: 15 }}
                            title="Sort By Created At"
                            right={() =>
                                sortMode === "createdAt" && (
                                    <MaterialCommunityIcons
                                        color={Colors.accentColor}
                                        name="arrow-down"
                                        size={25}
                                        style={{
                                            paddingTop: 3,
                                            paddingRight: 5,
                                        }}
                                    />
                                )
                            }
                        />
                    </TouchableRipple>
                    <TouchableRipple
                        style={{ height: 60, paddingTop: 5 }}
                        rippleColor="rgba(0, 0, 0, 0.2)"
                        onPress={() => handleSortByPriority()}
                    >
                        <List.Item
                            titleStyle={{ fontSize: 15 }}
                            title="Sort By Priority Is"
                            right={() =>
                                sortMode === "priorityIs" && (
                                    <MaterialCommunityIcons
                                        color={Colors.accentColor}
                                        name="arrow-down"
                                        size={25}
                                        style={{
                                            paddingTop: 3,
                                            paddingRight: 5,
                                        }}
                                    />
                                )
                            }
                        />
                    </TouchableRipple>
                    <TouchableRipple
                        style={{ height: 60, paddingTop: 5 }}
                        rippleColor="rgba(0, 0, 0, 0.2)"
                        onPress={() => handleSortByDueAt()}
                    >
                        <List.Item
                            titleStyle={{ fontSize: 15 }}
                            title="Sort By Due At"
                            right={() =>
                                sortMode === "taskTime" && (
                                    <MaterialCommunityIcons
                                        color={Colors.accentColor}
                                        name="arrow-up"
                                        size={25}
                                        style={{
                                            paddingTop: 3,
                                            paddingRight: 5,
                                        }}
                                    />
                                )
                            }
                        />
                    </TouchableRipple>
                </List.Section>
            </View>
        </SlidingUpPanel>
    );
};

export default SlideUpPanel;

const styles = StyleSheet.create({
    sliderContainer: {
        height: 200,
        backgroundColor: "white",
        flexDirection: "column",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        elevation: 16,
    },
    sortText: {
        fontSize: 14,
    },
});
