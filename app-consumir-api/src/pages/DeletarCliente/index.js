import React,{useEffect,useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, Button, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import api from '../../services/api/api';


//USANDO O DELETE DA API QUE FIZEMOS.

export default function DeletarCliente () {
    const [receiveIdClient, setReceiveIDClient] = useState(0)
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');


    const exibeAlert = async () => {
        setShowAlert(true)
    }

    const deletaCliente = async (id) => {
        try{
            const idparse = parseInt(id)
            if(!idparse <= 0 || !idparse == '' || !idparse == null) {
                const response = api.delete(`/clientes/${idparse}`)
                if(response?.data[0]?.affectedRows == 1) {
                    setAlertMessage('cliente deletado com sucesso')
                    exibeAlert()
                    return
                }else{
                    setAlertMessage('não foi possivel deletar o cliente em questão verifique o codigo e  tente novamente')
                }
            } else{
                console.log('insira um numero valido ')
            }

            
        }
       catch(error) {
        console.log(error)        
       }
    }


    return (
        <View>
            <Text>id:</Text>
            <TextInput value={receiveIdClient.toString()} onChangeText={setReceiveIDClient}></TextInput>
            <TouchableOpacity onPress={()=> deletaCliente(receiveIdClient)}><Text>deletar cliente</Text></TouchableOpacity>
            {showAlert && (Alert.alert('atenção!!',alertMessage,[{text:'OK', onPress: () => setShowAlert(false)}]))}
        </View>
    )

}