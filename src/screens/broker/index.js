import React, { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Loading from "../loading";
import styles from "./styles";
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { LineChart, Grid } from 'react-native-svg-charts'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CurrencyFormatter from "../../functions/currencyFormatter";
import { address } from "../../functions/strings";

export default function Broker({ route, navigation }) {
    const { uid } = route.params;
    const [state, setState] = useState("loading");
    const [stocks, setStocks] = useState([]);
    const [wallets, setWallets] = useState([]);
    const [selectedSID, setSelectedSID] = useState(0);
    const [quantity, setQuantity] = useState(1);

    let last;
    let trending;
    if (state != "loading") {
        last = stocks[selectedSID].last;
        trending = stocks[selectedSID].value - 1;
    }

    const getData = async () => {
        try {
            let response = await fetch(`${address}/broker`);
            let result = await response.json();
            let data = result["data"];
            setStocks(data["stocks"]);
            response = await fetch(`${address}/broker?uid=${uid}`)
            result = await response.json();
            data = result["data"];
            setWallets(data["wallet"]);
            setState("already");
        } catch (e) {
            Alert.alert("Erro!", e);
        }
    };

    const nextStock = () => {
        setSelectedSID(selectedSID == (stocks.length - 1) ? 0 : selectedSID + 1)
    }

    const previusStock = () => {
        setSelectedSID(selectedSID == 0 ? (stocks.length - 1) : selectedSID - 1)
    }

    const addQuantity = () => {
        setQuantity(quantity + 1);
    }

    const subtractQuantity = () => {
        if (quantity > 1)
            setQuantity(quantity - 1);
    }

    const buyStocks = async () => {
        try {
            let response = await fetch(`${address}/broker?uid=${uid}&quantity=${quantity}&sid=${selectedSID}&operation=buy`, { method: "POST" })
            let result = await response.json();
            let data = result["data"];
            if (result["result"] == "ERROR") {
                Alert.alert("Erro!", result["message"]);
            } else {
                Alert.alert("Sucesso!", "Compra efetuada com sucesso!");
            }
            setState("loading");
            getData();
        } catch (e) {
            Alert.alert("Erro!", e);
        }
    }

    const sellStocks = async () => {
        try {
            let response = await fetch(`${address}/broker?uid=${uid}&quantity=${quantity}&sid=${selectedSID}&operation=sell`, { method: "POST" })
            let result = await response.json();
            let data = result["data"];
            if (result["result"] == "ERROR") {
                Alert.alert("Erro!", result["message"]);
            } else {
                Alert.alert("Sucesso!", "Venda efetuada com sucesso!");
            }
            setState("loading");
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
    return <ScrollView style={styles.container} contentContainerStyle={{ justifyContent: "space-between" }}>
        <View>
            <Text style={styles.title}>Ações</Text>
            <View style={styles.chart}>
                <LineChart
                    style={{ height: 200 }}
                    data={stocks[selectedSID].last}
                    svg={{ stroke: 'rgb(134, 65, 244)' }}
                    contentInset={{ top: 20, bottom: 20 }}
                >
                    <Grid />
                </LineChart>
            </View>
            <View style={styles.stockRow}>
                <TouchableOpacity onPress={previusStock} style={styles.icon}>
                    <AntDesign name="left" size={24} color="#1976d2" />
                </TouchableOpacity>
                <View style={styles.stockCard}>
                    <View style={{ flex: 4 }}>
                        <Text style={styles.stockName}>{stocks[selectedSID].name}</Text>
                        <Text style={styles.stockText}>Cotação atual: {CurrencyFormatter(stocks[selectedSID].price.toFixed(0))}</Text>
                    </View>
                    <View style={styles.row}>
                        {trending > 0 && <Ionicons name="trending-up" size={24} color="#388E3C" />}
                        {trending < 0 && <Ionicons name="trending-down" size={24} color="#C62828" />}
                        {trending == 0 && <MaterialCommunityIcons name="trending-neutral" size={24} color="#1976d2" />}
                        {trending > 0 && <Text style={[styles.trending, { color: "#388E3C" }]}> +{Math.round(trending * 100)}%</Text>}
                        {trending < 0 && <Text style={[styles.trending, { color: "#C62828" }]}> {Math.round(trending * 100)}%</Text>}
                        {trending == 0 && <Text style={[styles.trending, { color: "#1976d2" }]}> {Math.round(trending * 100)}%</Text>}
                    </View>
                </View>
                <TouchableOpacity onPress={nextStock} style={styles.icon}>
                    <AntDesign name="right" size={24} color="#1976d2" />
                </TouchableOpacity>
            </View>
            <Text style={styles.centeredText}>Ações na sua carteira de investimento</Text>
            <View style={[styles.stockRow, { paddingHorizontal: 60 }]}>
                <Text style={styles.stockTitle}>{wallets[selectedSID].quantity} Ações</Text>
                <AntDesign name="arrowright" size={24} color="#1976d2" />
                <Text style={styles.stockTitle}>B$ {CurrencyFormatter((wallets[selectedSID].quantity * stocks[selectedSID].price).toFixed(0))}</Text>
            </View>
            <Text style={styles.centeredText}>Quantidade para movimentar</Text>
            <View style={[styles.stockRow, { justifyContent: "center", padding: 0 }]}>
                <TouchableOpacity onPress={subtractQuantity} style={[styles.icon, { padding: 20 }]}>
                    <AntDesign name="left" size={24} color="#1976d2" />
                </TouchableOpacity>
                <Text style={styles.stockTitle}>{quantity}</Text>
                <TouchableOpacity onPress={addQuantity} style={[styles.icon, { padding: 20 }]}>
                    <AntDesign name="right" size={24} color="#1976d2" />
                </TouchableOpacity>
            </View>
            <View style={styles.stockRow}>
                <TouchableOpacity onPress={sellStocks} style={styles.sell}>
                    <Text style={styles.textButton}>Vender</Text>
                    <Text style={styles.textButton}>B$ {CurrencyFormatter((quantity * stocks[selectedSID].price).toFixed(0))}</Text>
                </TouchableOpacity>
                <View style={{ width: 16 }} />
                <TouchableOpacity onPress={buyStocks} style={styles.buy}>
                    <Text style={styles.textButton}>Comprar</Text>
                    <Text style={styles.textButton}>B$ {CurrencyFormatter((quantity * stocks[selectedSID].price).toFixed(0))}</Text>
                </TouchableOpacity>
            </View>
        </View>
        <TouchableOpacity style={styles.backButton} onPress={() => { navigation.goBack() }}>
            <Text style={styles.textButton}>Voltar</Text>
        </TouchableOpacity>
    </ScrollView>
}