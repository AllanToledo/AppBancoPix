import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000051",
    },
    title: {
        color: "#fff",
        alignSelf: "center",
        marginTop: 40,
        fontSize: 18,
    },
    chart: {
        margin: 16,
        alignSelf: "stretch",
        borderRadius: 10,
        backgroundColor: "#1A237E"
    },
    backButton: {
        marginHorizontal: 16,
        marginBottom: 16,
        padding: 8,
        backgroundColor: "#1976D2",
        alignItems: "center",
        borderRadius: 10,
    },
    textButton: {
        color: "#fff"
    },
    stockRow: {
        flexDirection: "row",
        padding: 16,
        alignItems: "center",
        justifyContent: "space-between"
    },
    row: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end"
    },
    stockCard: {
        backgroundColor: "#1A237E",
        borderRadius: 10,
        padding: 16,
        flex: 1,
        marginHorizontal: 16,
        justifyContent: "space-between",
        flexDirection: "row",
    },
    icon: {
        marginTop: 3,
    },
    stockName: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
    },
    stockText: {
        color: "#fff",
    },
    trending: {

    },
    centeredText: {
        alignSelf: "center",
        color: "#fff"
    },
    stockTitle: {
        color: "#1976d2",
        fontSize: 24,
        fontWeight: "bold"
    },
    sell: {
        backgroundColor: "#388E3C",
        padding: 16,
        borderRadius: 10,
        flex: 1,
        alignItems: "center"
    },
    buy: {
        backgroundColor: "#C62828",
        padding: 16,
        borderRadius: 10,
        flex: 1,
        alignItems: "center"
    }
});