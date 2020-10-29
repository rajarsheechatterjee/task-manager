import React from "react";
import { Appbar } from "react-native-paper";

import Colors from "../../../theming/colors";

const Header = ({
    navigation,
    handleSlider,
    handleSync,
    deleteSelected,
    deleteVisible,
    deselectAll,
    selectedTasks,
}) => {
    const getLength = () => {
        return selectedTasks.length;
    };

    return !deleteVisible ? (
        <Appbar.Header style={{ backgroundColor: Colors.accentColor }}>
            <Appbar.Content title="Your Tasks" />
            <Appbar.Action icon="sync" onPress={() => handleSync()} />
            <Appbar.Action
                icon="filter-variant"
                onPress={() => handleSlider()}
            />
            <Appbar.Action
                icon="settings-outline"
                onPress={() => navigation.navigate("More")}
            />
        </Appbar.Header>
    ) : (
        <Appbar.Header style={{ backgroundColor: Colors.accentColor }}>
            <Appbar.Action
                icon="close"
                onPress={() => {
                    deselectAll();
                }}
            />
            <Appbar.Content title={getLength() + " selected"} />
            <Appbar.Action
                icon="trash-can-outline"
                onPress={() => {
                    deleteSelected();
                }}
            />
        </Appbar.Header>
    );
};

export default Header;
