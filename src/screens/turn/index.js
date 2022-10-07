import React, { useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import Loading from '../loading';
import { Ionicons } from '@expo/vector-icons';
import { useSocket } from "../../functions/useSocket";
import {address} from "../../functions/strings";

export default function Turn({ route, navigation }) {

    const { uid } = route.params;
    const { send, messages } = useSocket({ userId: 0, enabled: true });
    const [state, setState] = useState("loading");
    const [name, setName] = useState("");
    const [dice, setDice] = useState(0);
    const [position, setPosition] = useState(1);
    const [last, setLast] = useState([]);

    const getData = async () => {
        try {
            let response = await fetch(`${address}/turn`);
            let result = await response.json();
            console.log(result);
            let data = result["data"]["player"];
            setName(data["name"]);
            setDice(data["dice"]);
            setPosition(data["position"]);
            setState("already");
        } catch (e) {
            Alert.alert("Erro!", e);
        }
    }

    const playDice = async () => {
        try {
            let response = await fetch(`${address}/dice?uid=${uid}`, { method: "POST" });
            let result = await response.json();
            let data = result["data"];
            if (result["result"] === "ERROR") {
                Alert.alert('Atenção!', result["message"]);
            } else {
                setLast(data["dices"])
                Alert.alert("Mova seu peão!", `O resultado dos dados são: ${data["dices"].join(" e ")}`)
            }
            getData();
        } catch (e) {
            Alert.alert("Erro!", e);
        }
    }

    const nextTurn = async () => {
        try {
            let response = await fetch(`${address}/turn?uid=${uid}`, { method: "POST" });
            let result = await response.json();
            let data = result["data"];
            if (result["result"] === "ERROR") {
                Alert.alert('Atenção!', result["message"]);
            } else {
                setLast([]);
            }
            getData();
        } catch (e) {
            Alert.alert("Erro!", e);
        }
    }

    useEffect(() => {
        getData();
    }, [messages]);

    if (state === "loading")
        return <Loading />
    return <View style={styles.container}>
        <Text style={styles.title}>Turnos</Text>
        <View>
            <Text style={styles.subtitle}>Vez de</Text>
            <View style={styles.card}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.text}>Jogadas restantes <Text style={styles.blue}>{dice}</Text></Text>
                <Text style={styles.text}>Posição do jogador <Text style={styles.blue}>{position}</Text></Text>
                {last.length > 0 &&
                    <Text style={styles.text}>Ultimo resultado <Text style={styles.blue}>{last.join(", ")}</Text></Text>
                }
            </View>
            <View style={styles.row}>
                <TouchableOpacity style={styles.button} onPress={() => playDice()}>
                    <Ionicons name="ios-game-controller" size={48} color="#1976d2" />
                    <Text style={styles.textButton}>Jogar dados</Text>
                </TouchableOpacity>
                <View style={{ width: 16 }} />
                <TouchableOpacity style={styles.button} onPress={() => nextTurn()}>
                    <Ionicons name="play-forward" size={48} color="#1976d2" />
                    <Text style={styles.textButton}>Passar a vez</Text>
                </TouchableOpacity>
            </View>
        </View>
        <TouchableOpacity style={styles.backButton} onPress={() => { navigation.goBack(); }}>
            <Text style={styles.textButton}>Voltar</Text>
        </TouchableOpacity>
    </View>
}