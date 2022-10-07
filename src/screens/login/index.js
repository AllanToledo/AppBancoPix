import { useNavigation } from "@react-navigation/core";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import styles from "./styles";
import {address} from "../../functions/strings";

export default function Login() {

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [uid, setUid] = useState(-1);
    const navigation = useNavigation();

    const handleName = (text) => setName(text);
    const handlePassword = (text) => setPassword(text.toLowerCase().trim());
    const handleStart = () => {
        if (password.length > 0) {
            login();
        } else if (name.length > 0) {
            create();
        } else {
            Alert.alert("Nome inválido.", "Digite um nome válido.")
        }
    }

    const create = async () => {
        try {
            let response = await fetch(`${address}/create?name=${encodeURI(name)}`, { method: "POST" });
            let result = await response.json();
            let data = result["data"];
            console.log(data);
            if (result["result"] == "OK") {
                setUid(data["uid"]);
            } else {
                Alert.alert("Erro!", result["message"])
            }
        } catch (e) {
            Alert.alert("Erro!", e)
        }
    }

    const login = async () => {
        try {
            let response = await fetch(`${address}/login?password=${encodeURI(password)}`);
            let result = await response.json();
            let data = result["data"];
            console.log(data);
            if (result["result"] == "OK") {
                setUid(data["uid"]);
            } else {
                Alert.alert("Erro!", result["message"])
            }
        } catch (e) {
            Alert.alert("Erro!", e)
        }
    }


    useEffect(() => {
        if (uid > -1) {
            navigation.replace("Home", { uid })
        }
    }, [uid]);

    return <View style={styles.container}>
        <Text style={styles.title}>Banco Imobiliario</Text>
        <TextInput onChangeText={handleName} style={styles.textInput} placeholder="Digite seu nome" placeholderTextColor="#fffa" />
        <TextInput onChangeText={handlePassword} style={styles.textInput} autoCapitalize="none" placeholder="Ou digite seu código" placeholderTextColor="#fffa" />
        <TouchableOpacity onPress={handleStart} style={styles.button}>
            <Text style={styles.textButton}>Jogar</Text>
        </TouchableOpacity>
        <StatusBar style="light" />
    </View>
}