import React,{useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import NovoCliente from '../NovoCliente';
import DeletarCliente from '../DeletarCliente';


export default function Home() {

    const navigation = useNavigation();

    const navegaPesquisaID = () => {
        navigation.navigate('DetalhesCliente')
    }

    const navegaNovoCliente =() => {
        navigation.navigate('NovoCliente')
    }

    const navegaTodosClientes = () => {
        navigation.navigate('TodosClientes')
    }

    const navegaDeletarCliente = () => {
        navigation.navigate('DeletarCliente')
    }
    return(
        <SafeAreaView style={styles.container}>
            <Text>Seja Bem vindo!</Text>
            <Button title='Abrir pesquisa por id' onPress={navegaPesquisaID}></Button>
            <Button title='Abrir Criação Novo Cliente' onPress={navegaNovoCliente}></Button>
            <Button title='Abrir analise de todos clientes' onPress={navegaTodosClientes}></Button>
            <Button title='Abrir Deletar clientes' onPress={navegaDeletarCliente}></Button>
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