import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000051",
    },
    title: {
        color: "#fff",
        alignSelf: "center",
        fontSize: 24,
        marginVertical: 32,
    },
    extractValue: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16
    },
    extractText: {
        color: "#fff",
    },
    extractDate: {
        color: "#fff",
        alignSelf: "center",
        padding: 8,
    },
    extractCard: {
        marginHorizontal: 16,
        marginVertical: 4,
        backgroundColor: "#1A237E",
        borderRadius: 10,
        flexDirection: "row",
    },
    iconContainer: {
        padding: 16,
        alignSelf: "center"
    },
    extractBody: {
        flex: 1,
        marginVertical: 12,
    },
    extractEnd: {
        width: 20,
        alignSelf: "stretch",
        borderBottomEndRadius: 10,
        borderTopEndRadius: 10,
    },
    backButton: {
        position: "absolute",
        bottom: 20,
        left: 16,
        width: Dimensions.get("window").width - 32,
        alignItems: "center",
        padding: 8,
        backgroundColor: "#1976D2",
        borderRadius: 10,
    },
    textButton: {
        color: "#fff"
    }
});