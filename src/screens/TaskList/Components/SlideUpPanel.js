import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Colors from "../../../theming/colors";
import { List, TouchableRipple } from "react-native-paper";

import SlidingUpPanel from "rn-sliding-up-panel";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ripple from "react-native-material-ripple";

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
                <List.Section>
                    <TouchableRipple
                        rippleColor="rgba(0, 0, 0, 0.2)"
                        onPress={handleSortByCreatedAt}
                    >
                        <List.Item
                            title="Sort By Created At"
                            right={() =>
                                sortMode === "createdAt" && (
                                    <List.Icon
                                        color={Colors.accentColor}
                                        icon="arrow-down"
                                    />
                                )
                            }
                        />
                    </TouchableRipple>
                    <TouchableRipple
                        rippleColor="rgba(0, 0, 0, 0.2)"
                        onPress={handleSortByPriority}
                    >
                        <List.Item
                            title="Sort By Priority Is"
                            right={() =>
                                sortMode === "priorityIs" && (
                                    <List.Icon
                                        color={Colors.accentColor}
                                        icon="arrow-down"
                                    />
                                )
                            }
                        />
                    </TouchableRipple>
                    <TouchableRipple
                        rippleColor="rgba(0, 0, 0, 0.2)"
                        onPress={handleSortByDueAt}
                    >
                        <List.Item
                            title="Sort By Due At"
                            right={() =>
                                sortMode === "taskTime" && (
                                    <List.Icon
                                        color={Colors.accentColor}
                                        icon="arrow-up"
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
    },
    sortText: {
        fontSize: 14,
    },
});
