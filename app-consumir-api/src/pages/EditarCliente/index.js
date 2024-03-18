import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import api from '../../services/api/api';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function EditarCliente() {
    const route = useRoute();
    const navigation = useNavigation();


    const [txtId, setTxtId] = useState(route.params?.id);
    const [txtNome, setTxtNome] = useState(route.params?.nome);
    const [txtIdade, setTxtIdade] = useState(route.params?.idade);
    const teste = [route.params?.nome, route.params.id, route.params?.idade]

    teste.forEach((el) => {
        console.log('valor retornado para teste: ' + el)
    })

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const exibeAlert = async () => {
        setShowAlert(true)
    }

    const editarCliente = async () => {
        try {
            // if(nome == '' || idade =='' || nome == null || idade == null || idade < 1 ) {
            //     setAlertMessage('preencha o corretamente os campos')
            //     return
            // } 

            if (txtNome == '' || txtNome == null) {
                setAlertMessage('Preencha corretamente o campo nome')
                exibeAlert()
                return;
            } if (isNaN(txtIdade)) {
                setAlertMessage('o valor digitado no campo idade não é um numero')
                exibeAlert()
                return;
            }
            if (txtIdade == '' || txtIdade == null || txtIdade < 1) {
                setAlertMessage('Preencha corretamente o campo idade')
                exibeAlert()
                return;
            }

            const response = await api.put(`/clientes/${txtId}`, { nome: txtNome, idade: Number(txtIdade) })
                .catch((error) => {
                    if (error.response) {
                        console.log(error.response.data)
                        console.log(error.response.status)
                        console.log(error.response.headers)
                    } else if (error.request) {
                        if ((error.request_response).includes('Failed')) {
                            console.error('erro de conexão com a API')
                        }
                    } else {
                        console.error(error.message)
                    }
                    console.log(error.config);
                });
            if (response != undefined) {
                if (response?.data[0].changedRows == 1) {
                    setTxtId('');
                    setTxtNome('');
                    setTxtIdade(0);
                    setAlertMessage('Cliente Alterado com sucesso!!')
                    exibeAlert();
                } else {
                    console.log('o registro não foi inserido, verifique os campos e tente novamente.')
                }
            }
        }
        catch (error) {
            console.log(error)
        }
    }


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.cardTitle}>
                <Text Style={styles.title}>Preencha os campos abaixo:</Text>
            </View>

            <Text>ID:</Text>
            <TextInput style={styles.inputText} value={txtId.toString()} onChangeText={setTxtId} ></TextInput>

            <Text>Nome do cliente:</Text>
            <TextInput style={styles.inputText} value={txtNome} onChangeText={setTxtNome}></TextInput>

            <Text>Idade do cliente:</Text>
            <TextInput style={styles.inputText} value={txtIdade.toString()} onChangeText={setTxtIdade}></TextInput>

            <TouchableOpacity onPress={() => { editarCliente() }} style={styles.alignVH}>
                <Text>Salvar Cliente</Text>
            </TouchableOpacity>

            {showAlert && (Alert.alert('atenção!!', alertMessage, [{ 
                text: 'OK', onPress: () => {
                    setShowAlert(false) ;
                    navigation.navigate('TodosClientes',{status:true});

                }
}]))}
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        gap: 10
    },

    cardTitle: {
        paddingBottom: 30,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    alignVH: {
        alignItems: 'center',
        justifyContent: 'center'
    },

    inputText: {
        borderWidth: 2,
        borderColor: 'yellow',
        borderRadius: 5,
        padding: 5,
        width: '80%',
        fontWeight: 'bold',
        color: 'black'
    }

});