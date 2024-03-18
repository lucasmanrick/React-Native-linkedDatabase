import React,{useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import api from '../../services/api/api';

export default function NovoCliente () {

    const [nome,setNome] = useState('');
    const [idade,setIdade] = useState(0);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const exibeAlert = async () => {
        setShowAlert(true)
    }

   const salvarCliente = async () => {
    try {
        // if(nome == '' || idade =='' || nome == null || idade == null || idade < 1 ) {
        //     setAlertMessage('preencha o corretamente os campos')
        //     return
        // } 

        if(nome == '' || nome == null) {
            setAlertMessage('Preencha corretamente o campo nome')
            exibeAlert()
            return;
        }if(isNaN(idade)) {
            setAlertMessage ('o valor digitado no campo idade não é um numero')
            exibeAlert()
            return;
        }
        if(idade == ''|| idade == null || idade < 1) {
            setAlertMessage ('Preencha corretamente o campo idade')
            exibeAlert()
            return;
        }

        const response = await api.post('/clientes', {nome:nome,idade:Number(idade)})
        .catch((error)=> {
            if(error.response){
                console.log(error.response.data)
                console.log(error.response.status)
                console.log(error.response.headers)
            }else if (error.request) {
                if((error.request_response).includes('Failed') ) {
                    console.log('erro de conexão com a API')
                }
            }else {
                console.log(error.message)
            }
            console.log(error.config);
        });
        if(response != undefined) {
            if(response?.data[0].affectedRows == 1) {
                setNome('')
                setIdade(0);
                setAlertMessage('Cliente Cadastrado com sucesso!!')
                exibeAlert()
                console.log(response)
            }else{
                console.log('o registro não foi inserido, verifique os campos e tente novamente.')
            }
        }
     }
    catch(error) {
        console.log(error)
    }
   }


    return(
        <SafeAreaView style={styles.container}>
           <View style={styles.cardTitle}>
                <Text Style={styles.title}>Preencha os campos abaixo:</Text>
           </View>
           <Text>Nome do cliente:</Text>
           <TextInput style={styles.inputText} value={nome} onChangeText={setNome}></TextInput>
           <Text>Idade do cliente:</Text>
           <TextInput style={styles.inputText} value={idade.toString()} onChangeText={setIdade}></TextInput>
            <TouchableOpacity onPress={() => { salvarCliente()}} style={styles.alignVH}>
                <Text>Salvar Cliente</Text>
            </TouchableOpacity>

            {showAlert && (Alert.alert('atenção!!',alertMessage,[{text:'OK', onPress: () => setShowAlert(false)}]))}
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        gap:10
    },

    cardTitle: {
        paddingBottom:30,
        alignItems:'center'
    },
    title: {
        fontSize:20,
        fontWeight:'bold'
    },
    alignVH: {
        alignItems:'center',
        justifyContent:'center'
    },

    inputText:{
        borderWidth:1,
        borderColor:'yellow',
        borderRadius:5,
        padding:5,
        width:'80%'
    }

});