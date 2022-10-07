import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000051"
    },
    title: {
        fontWeight: "bold",
        fontSize: 24,
        color: "#fff",
        marginVertical: 32,
    },
    textInput: {
        alignSelf: "stretch",
        marginHorizontal: 32,
        marginVertical: 8,
        backgroundColor: "#1A237E",
        borderRadius: 5,
        padding: 8,
        color: "#fff"
    },
    button: {
        marginVertical: 32,
        padding: 8,
        paddingHorizontal: 32,
        borderRadius: 5,
        backgroundColor: "#1976D2"
    },
    textButton: {
        color: "#fff"
    }
});