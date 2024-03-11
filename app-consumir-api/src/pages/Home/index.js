import React,{useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import NovoCliente from '../NovoCliente';


export default function Home() {

    const navigation = useNavigation();

    const navegaPesquisaID = () => {
        navigation.navigate('DetalhesCliente')
    }

    const navegaNovoCliente =() => {
        navigation.navigate('NovoCliente')
    }

    return(
        <SafeAreaView style={styles.container}>
            <Text>Seja Bem vindo!</Text>
            <Button title='Abrir pesquisa por id' onPress={navegaPesquisaID}></Button>
            <Button title='Abrir Criação Novo Cliente' onPress={navegaNovoCliente}></Button>
        </SafeAreaView>
    )

}




const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      gap:10
    }
})