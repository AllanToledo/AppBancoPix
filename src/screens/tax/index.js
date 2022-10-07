import React, { useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import CurrencyFormatter from "../../functions/currencyFormatter";
import Loading from "../loading";
import styles from "./styles";
import {address} from "../../functions/strings";

export default function Tax({ route, navigation }) {

    const { uid } = route.params;
    const [state, setState] = useState("loading");
    const [cost, setCost] = useState(0);
    const [mulct, setMulct] = useState(0);

    const getData = async () => {
        try {
            let response = await fetch(`${address}/tax?uid=${uid}`);
            let result = await response.json();
            let data = result["data"];
            if (result["result"] == "OK") {
                setCost(data["cost"]);
                setMulct(data["mulct"]);
                setState("already");
            }
        } catch (e) {
            Alert.alert("Erro!", e);
        }
    };

    const pay = async () => {
        try {
            let response = await fetch(`${address}/tax?uid=${uid}`, { method: "POST" });
            let result = await response.json();
            let data = result["data"];
            if (result["result"] == "ERROR") {
                Alert.alert("Atenção", result["message"]);
            } else {
                Alert.alert("Sucesso", "Seus impostos foram pagos.")
            }
            getData();
        } catch (e) {
            Alert.alert("Erro!", e);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    if (state == "loading")
        return <Loading />
    return <View style={styles.container}>
        <Text style={styles.title}>Imposto de Renda</Text>
        <View>
            <Text style={styles.subtitle}>Total a pagar</Text>
            <View style={styles.card}>
                <Text style={styles.cost}><Text style={styles.symbol}>B$ </Text>{CurrencyFormatter(cost)}</Text>
                {mulct > 0 &&
                    <View>
                        <Text style={styles.subtitle}>+</Text>
                        <Text style={styles.mulctText}><Text style={styles.symbol}>B$ </Text><Text style={styles.mulct}>{CurrencyFormatter(mulct)}</Text> Multa por atraso.</Text>
                    </View>
                }
            </View>
            <TouchableOpacity style={styles.backButton} onPress={() => { pay(); }}>
                <Text style={styles.textButton}>Pagar</Text>
            </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => { navigation.goBack(); }} style={styles.backButton}>
            <Text style={styles.textButton}>Voltar</Text>
        </TouchableOpacity>
    </View>

}