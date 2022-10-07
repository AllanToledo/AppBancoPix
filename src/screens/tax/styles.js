import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000051",
        justifyContent: "space-between"
    },
    title: {
        marginTop: 40,
        color: "#fff",
        fontSize: 18,
        alignSelf: "center"
    },
    subtitle: {
        color: "#fff",
        fontSize: 16,
        alignSelf: "center"
    },
    card: {
        padding: 16,
        borderRadius: 10,
        alignSelf: "stretch",
        justifyContent: "center",
        backgroundColor: "#1A237E",
        alignItems: "stretch",
        margin: 32,
    },
    symbol: {
        color: "#fff",
        fontWeight: "bold",
    },
    cost: {
        color: "#1976D2",
        fontWeight: "bold",
        fontSize: 28,
        alignSelf: "center",
    },
    mulctText: {
        color: "#fff",
        fontSize: 18,
        alignSelf: "center",
    },
    mulct: {
        color: "#C62828",
        fontWeight: "bold",
    },
    backButton: {
        margin: 16,
        padding: 8,
        backgroundColor: "#1976D2",
        alignItems: "center",
        borderRadius: 10,
    },
    textButton: {
        color: "#fff"
    }
});