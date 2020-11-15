import React, { useContext } from "react";
import { Appbar } from "react-native-paper";

import { ThemeContext } from "../../../navigation/ThemeProvider";

const Header = ({ navigation, handleSlider, handleSync }) => {
    const { theme } = useContext(ThemeContext);

    return (
        <Appbar.Header style={{ backgroundColor: theme.colorAccentPrimary }}>
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
