import React, { Component } from "react";
import { LightTheme, DarkTheme } from "../theming/Themes";

const Context = React.createContext();

export class AppContextProvider extends Component {
    state = {
        theme: DarkTheme,
        updateTheme: (theme) => {
            this.setState({ theme: theme });
        },
    };

    render() {
        const { theme } = this.state;
        return (
            <Context.Provider value={this.state} theme={theme}>
                {this.props.children}
            </Context.Provider>
        );
    }
}

export const AppConsumer = Context.Consumer;
export const AppContext = Context;
