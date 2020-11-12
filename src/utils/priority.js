import Colors from "../theming/colors";

/**
 * Sets the priority marker's color
 * @param {Number} priority
 */

export const priorityColor = (priority) => {
    if (priority === 1) {
        return {
            backgroundColor: Colors.priorityHigh,
            borderColor: Colors.priorityHigh,
        };
    } else if (priority === 2) {
        return {
            backgroundColor: Colors.priorityMid,
            borderColor: Colors.priorityMid,
        };
    } else if (priority === 3) {
        return {
            backgroundColor: Colors.priorityLow,
            borderColor: Colors.priorityLow,
        };
    } else {
        return {
            backgroundColor: "white",
            borderColor: "white",
        };
    }
};

export const priorityTextColor = (priority) => {
    if (priority === 1) {
        return {
            color: Colors.priorityHigh,
        };
    } else if (priority === 2) {
        return {
            color: Colors.priorityMid,
        };
    } else if (priority === 3) {
        return {
            color: Colors.priorityLow,
        };
    } else {
        return {
            color: Colors.textColor,
        };
    }
};
