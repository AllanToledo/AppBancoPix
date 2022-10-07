import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Loading from "../loading";
import styles from "./styles";
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useSocket } from "../../functions/useSocket";
import CurrencyFormatter from "../../functions/currencyFormatter";
import {address} from "../../functions/strings";

export default function Home({ route, navigation }) {

    const { uid } = route.params;
    //console.log(uid);

    const { send, messages } = useSocket({ userId: 0, enabled: true });
    const [state, setState] = useState("loading")
    const [money, setMoney] = useState(0)
    const [name, setName] = useState("")

    const getData = async () => {
        try {
            let response = await fetch(`${address}/data?uid=${uid}`);
            let result = await response.json();
            let data = result["data"];
            if (result["result"] == "OK") {
                setMoney(data["data"]["money"]);
                setName(data["data"]["name"]);
                setState("already");
            }
        } catch (e) {
            Alert.alert("Erro!", e);
        }
    }

    useEffect(() => {
        const willFocusSubscription = navigation.addListener('focus', () => {
            getData();
        });

        return willFocusSubscription;
    }, []);

    useEffect(() => {
        getData();

    }, [messages]);

    if (state == "loading")
        return <Loading />
    return <View style={styles.container}>
        <View style={styles.moneyCard}>
            <View>
                <Text style={styles.moneyCardText}>Saldo</Text>
                <Text style={styles.moneyCardValue}>B$ {CurrencyFormatter(money)}</Text>
            </View>
            <TouchableOpacity onPress={() => { getData(); }}>
                <Ionicons name="reload" size={24} color="#000051" />
            </TouchableOpacity>
        </View>
        <Text style={styles.greetings}>Olá, {name}</Text>
        <View style={styles.grid}>
            <TouchableOpacity style={styles.button} onPress={() => {
                navigation.navigate("Turn", { uid });
            }}>
                <Ionicons name="ios-game-controller" size={34} style={styles.icon} color="#1976D2" />
                <Text style={styles.textButton}>Turnos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => {
                navigation.navigate("Pix", { uid, money });
            }}>
                <FontAwesome5 name="exchange-alt" size={34} style={styles.icon} color="#1976D2" />
                <Text style={styles.textButton}>Pix</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => {
                navigation.navigate("Extract", { uid });
            }}>
                <Entypo name="text" size={34} style={styles.icon} color="#1976D2" />
                <Text style={styles.textButton}>Extrato</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => {
                navigation.navigate("Tax", { uid });
            }}>
                <FontAwesome name="dollar" size={34} style={styles.icon} color="#1976D2" />
                <Text style={styles.textButton}>Imposto de Renda</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => {
                navigation.navigate("Broker", { uid });
            }}>
                <Ionicons name="trending-up" size={34} style={styles.icon} color="#1976D2" />
                <Text style={styles.textButton}>Ações</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => {
                navigation.navigate("Casino", { uid, money });
            }}>
                <FontAwesome5 name="dice" size={34} style={styles.icon} color="#1976D2" />
                <Text style={styles.textButton}>Cassino</Text>
            </TouchableOpacity>
        </View>
    </View>
}