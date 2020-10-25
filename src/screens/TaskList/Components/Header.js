import React from "react";
import { Appbar } from "react-native-paper";

import Colors from "../../../theming/colors";

const Header = ({ navigation, handleSlider, handleSync }) => {
    return (
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
    );
};

export default Header;
