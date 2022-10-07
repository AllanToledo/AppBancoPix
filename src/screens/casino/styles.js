import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000051",
        justifyContent: "space-between",
    },
    title: {
        color: "#fff",
        alignSelf: "center",
        fontSize: 24,
        marginTop: 40
    },
    subtitle: {
        color: "#fff",
        alignSelf: "center",
        fontSize: 18,
        marginBottom: 16,
    },
    card: {
        padding: 16,
        borderRadius: 10,
        backgroundColor: "#1A237E",
        marginHorizontal: 16,
        alignItems: "center"
    },
    name: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 24
    },
    textButton: {
        color: "#fff",
    },
    blue: {
        color: "#1976d2",
    },
    backButton: {
        margin: 16,
        padding: 8,
        backgroundColor: "#1976D2",
        alignItems: "center",
        borderRadius: 10,
    },
    outline: {
        margin: 16,
        padding: 8,
        borderWidth: 1,
        borderColor: "#1976D2",
        alignItems: "center",
        borderRadius: 10,
    },
    award: {
        color: "#1976D2",
        alignSelf: "center",
        fontWeight: "bold",
        fontSize: 42,
    },
    button: {
        backgroundColor: "#1A237E",
        flex: 1,
        borderRadius: 10,
        alignItems: "center",
        padding: 16
    }
});