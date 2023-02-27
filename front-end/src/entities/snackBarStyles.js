const getSnackBarStyles = (isError = false) => {
    return {
        container: [
            ["background", [isError ? "red" : "#2e38f7"]],
            ["border", "1px solid #000000"],
            ["border-radius", "4px"],
            ["box-shadow", "4px 4px 0px #000000"],
            
        ],
        message: [
            ["color", "white"],
        ]
    };
};

export default getSnackBarStyles;