import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Loading from '../loading';
import styles from './styles';
import { MaterialIcons } from '@expo/vector-icons';
import CurrencyFormatter from '../../functions/currencyFormatter';
import { format } from "date-fns";
import { useSocket } from '../../functions/useSocket';
import {address} from "../../functions/strings";


export default function Extract({ route, navigation }) {

    const { uid } = route.params;
    const { send, messages } = useSocket({ userId: 0, enabled: true });
    const [state, setState] = useState("loading");
    const [extracts, setExtracts] = useState([]);

    const getData = async () => {
        try {
            let response = await fetch(`${address}/transaction?uid=${uid}`);
            let result = await response.json();
            let data = result["data"];
            setExtracts(data["transactions"]);
            setState("already");
        } catch (e) {
            Alert.alert("Erro!", e);
        }
    };

    useEffect(() => {
        getData();
    }, [messages]);

    if (state == "loading")
        return <Loading />
    return <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
            <Text style={styles.title}>Extrato</Text>
            {extracts.map((item, index) => {
                return <View style={styles.extractCard} key={`extract${index}`}>
                    <View style={styles.iconContainer}>
                        <MaterialIcons name="attach-money" size={24} color="#fff" />
                    </View>
                    <View style={styles.extractBody}>
                        <Text style={styles.extractValue}>{(item.originUID == uid ? "-" : "")} B$ {CurrencyFormatter(Math.round(item.quantity))}</Text>
                        <Text style={styles.extractText}>{(item.originUID == uid ? `Para: ${item.receiver}` : `De: ${item.origin}`)}</Text>
                        <Text style={styles.extractText}>{item.type}</Text>
                    </View>
                    <Text style={styles.extractDate}>{format(new Date(item.date), "HH:mm")}</Text>
                    <View style={[styles.extractEnd, { backgroundColor: (item.originUID == uid ? "#C62828" : "#388E3C") }]} />
                </View>
            })}
            <View style={{ height: 150 }} />
        </ScrollView>
        <TouchableOpacity onPress={() => { navigation.goBack(); }} style={styles.backButton}>
            <Text style={styles.textButton}>Voltar</Text>
        </TouchableOpacity>
    </View>
}