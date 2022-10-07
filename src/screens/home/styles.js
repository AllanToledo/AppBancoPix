import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000051",
        paddingTop: 32,
    },
    moneyCard: {
        margin: 16,
        padding: 16,
        borderRadius: 10,
        backgroundColor: "#1976D2",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    moneyCardText: {
        color: "#000051",
        fontSize: 12
    },
    moneyCardValue: {
        color: "#fff",
        fontSize: 24
    },
    greetings: {
        color: "#fff",
        margin: 16,
        fontSize: 18,
        textAlign: "center"
    },
    grid: {
        margin: 12,
        flexWrap: "wrap",
        flexDirection: "row"
    },
    button: {
        width: (Dimensions.get("window").width - 32 - 16) / 3,
        paddingVertical: 24,
        paddingHorizontal: 8,
        borderRadius: 10,
        backgroundColor: "#002171",
        margin: 4,
        alignItems: "center"
    },
    textButton: {
        color: "#fff",
        fontSize: 16,
        textAlign: "center"
    },
    icon: {
        marginBottom: 8,
    }
});