/**
 * Sets the priority marker's color
 * @param {Number} priority
 */

export const priorityColor = (priority) => {
    if (priority === 1) {
        return {
            backgroundColor: "red",
            borderColor: "red",
        };
    } else if (priority === 2) {
        return {
            backgroundColor: "orange",
            borderColor: "orange",
        };
    } else if (priority === 3) {
        return {
            backgroundColor: "dodgerblue",
            borderColor: "dodgerblue",
        };
    } else {
        return {
            backgroundColor: "white",
            borderColor: "white",
        };
    }
};
