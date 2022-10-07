import React, {useEffect, useState} from "react";
import {Alert, Text, TouchableOpacity, View} from "react-native";
import styles from "./styles";
import Loading from "../loading";
import CurrencyFormatter from "../../functions/currencyFormatter";
import {address} from "../../functions/strings";

export default function Casino({ route, navigation }) {

    const { uid } = route.params;
    const [state, setState] = useState("loading");
    const [owner, setOwner] = useState("");
    const [ownerUID, setOwnerUID] = useState(-1);
    const [cost, setCost] = useState(0);
    const [award, setAward] = useState(0);

    const getData = async () => {
        try {
            let response = await fetch(`${address}/casino`);
            let data = await response.json();
            setOwner(data["owner"]);
            setOwnerUID(data["ownerUID"]);
            setCost(data["cost"]);
            setAward(data["award"]);
            setState("already");
        } catch (e) {
            Alert.alert("Error!", e);
        }
    };

    const bet = async () => {
        try {
            let response = await fetch(`${address}/bet?uid=${uid}`, { method: "POST" });
            let data = await response.json();
            Alert.alert("Atenção!", data["message"]);
            getData();
        } catch (e) {
            Alert.alert("Error!", e);
        }
    }

    const buy = async () => {
        try {
            let response = await fetch(`${address}/casino?uid=${uid}&operation=buy`, { method: "POST" });
            let data = await response.json();
            if (data["result"] === "ERROR")
                Alert.alert("Atenção!", data["message"]);
            else
                Alert.alert("Parabens!", "Você está sob posse do cassino.");
            getData();
        } catch (e) {
            Alert.alert("Error!", e);
        }
    }

    const sell = async () => {
        try {
            let response = await fetch(`${address}/casino?uid=${uid}&operation=sell`, { method: "POST" });
            let data = await response.json();
            if (data["result"] === "ERROR")
                Alert.alert("Atenção!", data["message"]);
            else
                Alert.alert("Sucesso!", "Você vendeu o Cassino, agora está sob posse do Banco.");
            getData();
        } catch (e) {
            Alert.alert("Error!", e);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    if (state === "loading")
        return <Loading />
    return <View style={styles.container}>
        <View>
            <Text style={styles.title}>Cassino</Text>
            <Text style={styles.subtitle}>dono atual</Text>
            <Text style={[styles.subtitle, styles.blue]}>{owner}</Text>
            <TouchableOpacity onPress={bet} style={styles.card}>
                <Text style={styles.subtitle}>Apostar</Text>
                <Text style={styles.award}>B$ {CurrencyFormatter(award)}</Text>
            </TouchableOpacity>
        </View>
        <View>
            {ownerUID == -1 &&
                <TouchableOpacity onPress={buy} style={styles.backButton}>
                    <Text style={styles.textButton}>Comprar Cassino</Text>
                </TouchableOpacity>
            }
            {ownerUID == uid &&
                <TouchableOpacity onPress={sell} style={styles.outline}>
                    <Text style={styles.textButton}>Vender Cassino</Text>
                </TouchableOpacity>
            }
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Text style={styles.textButton}>Voltar</Text>
            </TouchableOpacity>
        </View>
    </View>
}