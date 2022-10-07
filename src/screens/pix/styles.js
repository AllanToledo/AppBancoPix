import { StyleSheet } from "react-native";

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
    textButton: {
        color: "#fff",
        fontSize: 16,
        textAlign: "center"
    },
    icon: {
        marginBottom: 8,
    },
    title: {
        color: "#fff",
        alignSelf: "center",
        fontSize: 18,
        marginTop: 48
    },
    textInputAux: {
        color: "#fff",
        alignSelf: "center",
        fontSize: 28,
    },
    textInput: {
        backgroundColor: "#000051",
        padding: 8,
        paddingHorizontal: 16,
        overflow: "visible",
        borderRadius: 5,
        color: "#1976D2",
        fontWeight: "bold",
        textAlign: "center",
        alignSelf: "center",
        fontSize: 28
    },
    textInputContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 48,
    },
    destiny: {
        color: "#fff",
        fontSize: 18,
        marginBottom: 16,
        alignSelf: "center"
    },
    pickerContainer: {
        backgroundColor: "#002171",
        marginHorizontal: 64,
        padding: 8,
        borderRadius: 5,
    },
    picker: {
        color: "#fff",
        padding: 8,
    },
    buttonContainer: {
        flexDirection: "row",
        alignSelf: "stretch",
        margin: 16,
    },
    cancelButton: {
        backgroundColor: "#000051",
        borderRadius: 5,
        flex: 1,
        padding: 8,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#1976D2"
    },
    confirmButton: {
        backgroundColor: "#1976D2",
        borderRadius: 5,
        flex: 1,
        padding: 8,
        alignItems: "center",
    },
});