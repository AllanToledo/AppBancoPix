import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, Platform } from "react-native";
import styles from "./styles";
import Loading from "../loading";
import { Picker } from '@react-native-picker/picker';
import CurrencyFormatter from "../../functions/currencyFormatter";
import { useSocket } from "../../functions/useSocket";
import {address} from "../../functions/strings";

export default function Pix({ route, navigation }) {

    const bank = { name: "Banco", uid: -1 };
    const iosPicker = Platform.OS == "ios" ? { color: "#fff" } : {}
    const { uid } = route.params;
    const { send, messages } = useSocket({ userId: 0, enabled: true });
    const [state, setState] = useState("loading");
    const [options, setOptions] = useState([]);
    const [money, setMoney] = useState(0);
    const [selectedPlayer, setSelectedPlayer] = useState(bank);
    const [quantity, setQuantity] = useState("");

    const getData = async () => {
        try {
            let response = await fetch(`${address}/players`);
            let result = await response.json();
            let data = result["data"];

            if (result["result"] == "OK") {
                let players = data["players"]
                let aux = [];
                players.forEach((value) => {
                    if (value.uid != uid)
                        aux.push(value);
                    else
                        setMoney(value.money)
                });
                setSelectedPlayer(bank);
                setOptions(aux);
                setState("already");
            }
        } catch (e) {
            Alert.alert("Erro!", e);
        }

    };

    const transfer = async () => {
        try {
            let response = await fetch(
                `${address}/transaction?origin=${uid}&quantity=${encodeURI(quantity.replace(/,/g, ''))}&receiver=${selectedPlayer.uid}`,
                { method: "POST" }
            );
            let result = await response.json();
            let data = result["data"];
            if (result["result"] == "OK") {
                getData();
                setQuantity("");
                Alert.alert("Transação concluida.", `Transferido ${quantity} para ${selectedPlayer.name}`);
            } else {
                Alert.alert("Erro.", result["message"]);
            }
        } catch (e) {
            Alert.alert("Erro!", e);
        }
    }

    const handleCancel = () => {
        navigation.goBack();
    }

    const handleConfirm = () => {
        transfer();
    }

    useEffect(() => {
        getData();
    }, [messages]);

    if (state == "loading")
        return <Loading />
    return <ScrollView style={styles.container} contentContainerStyle={{ justifyContent: "space-between" }}>
        <View>
            <View style={styles.moneyCard}>
                <View>
                    <Text style={styles.moneyCardText}>Saldo</Text>
                    <Text style={styles.moneyCardValue}>B$ {CurrencyFormatter(money)}</Text>
                </View>
            </View>
            <Text style={styles.title}>Valor do pix</Text>
            <View style={styles.textInputContainer}>
                <Text style={styles.textInputAux}>B$</Text>
                <TextInput onChangeText={text => {
                    let formatted = CurrencyFormatter(text.replace(/,/g, ''));
                    console.log(formatted);
                    setQuantity(formatted);
                }} keyboardType="decimal-pad" style={styles.textInput} placeholder="0" placeholderTextColor="#1976D2" >
                    {quantity}
                </TextInput>
            </View>
            <Text style={styles.destiny}>Destinatário</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={selectedPlayer.uid}
                    onValueChange={(item, index) => {
                        var selection = options.filter((player) => player.uid == item);
                        if (selection.length > 0)
                            setSelectedPlayer(selection[0]);
                        else
                            setSelectedPlayer(bank);
                    }}
                    itemStyle={iosPicker}
                    style={[styles.picker, iosPicker]}
                >
                    <Picker.Item label={`Banco`} value={bank} />
                    {
                        options.map((player, index) => <Picker.Item label={`${player.name} - ${player.uid}`} key={`item${index}`} value={player.uid} />)
                    }
                </Picker>
            </View>
        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
                <Text style={styles.textButton}>Voltar</Text>
            </TouchableOpacity>
            <View style={{ width: 16 }} />
            <TouchableOpacity onPress={handleConfirm} style={styles.confirmButton}>
                <Text style={styles.textButton}>Transferir</Text>
            </TouchableOpacity>
        </View>
        <View style={{ height: 100 }} />
    </ScrollView>
}