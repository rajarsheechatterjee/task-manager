import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Colors from "../../../theming/colors";

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
            draggableRange={{ top: 190, bottom: 0 }}
        >
            <View style={styles.sliderContainer}>
                <Ripple
                    rippleCentered={true}
                    style={{
                        flex: 1,
                        height: 50,
                        justifyContent: "center",
                        paddingHorizontal: 20,
                    }}
                    onPress={handleSortByCreatedAt}
                >
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.sortText}>Sort By Created At</Text>
                        {sortMode === "createdAt" && (
                            <MaterialCommunityIcons
                                name="arrow-down"
                                color={Colors.accentColor}
                                size={20}
                                style={{
                                    marginLeft: 7,
                                }}
                            />
                        )}
                    </View>
                </Ripple>
                <Ripple
                    rippleCentered={true}
                    style={{
                        flex: 1,
                        height: 50,
                        justifyContent: "center",
                        paddingHorizontal: 20,
                    }}
                    onPress={handleSortByPriority}
                >
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.sortText}>Sort By Priority</Text>
                        {sortMode === "priorityIs" && (
                            <MaterialCommunityIcons
                                name="arrow-down"
                                color={Colors.accentColor}
                                size={20}
                                style={{
                                    marginLeft: 7,
                                }}
                            />
                        )}
                    </View>
                </Ripple>
                <Ripple
                    rippleCentered={true}
                    style={{
                        flex: 1,
                        height: 50,
                        justifyContent: "center",
                        paddingHorizontal: 20,
                    }}
                    onPress={handleSortByDueAt}
                >
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.sortText}>Sort By Due At</Text>
                        {sortMode === "taskTime" && (
                            <MaterialCommunityIcons
                                name="arrow-up"
                                color={Colors.accentColor}
                                size={20}
                                style={{
                                    marginLeft: 7,
                                }}
                            />
                        )}
                    </View>
                </Ripple>
            </View>
        </SlidingUpPanel>
    );
};

export default SlideUpPanel;

const styles = StyleSheet.create({
    sliderContainer: {
        height: 190,
        backgroundColor: "white",
        flexDirection: "column",
    },
    sortText: {
        fontSize: 14,
    },
});
