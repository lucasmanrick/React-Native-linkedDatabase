import React,{useEffect,useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, Button, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import api from '../../services/api/api';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';

export default function TodosClientes () {
    const navigation = useNavigation();
    const route = useRoute();

    let [flatListClientes, setFlatListClientes] = useState ([]);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [refresh,setRefresh] = useState(false);
    const [status, setStatus] = useState(false);

    const exibeAlert = async () => {
        setShowAlert(true)
    }



    const deletaCliente = async (ID) => {
        try {
            const response = await api.delete(`/clientes/${ID}`)
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
                if(response.data[0].affectedRows > 0 ) {
                    // se o refresh estiver true vira false e se tiver false vira true, funciona como um toggle
                    setAlertMessage('cliente deletado com sucesso!');
                    setRefresh(prevState => !prevState);
                    exibeAlert()
                }else{
                    setAlertMessage('nenhum registro foi localizado!')
                    exibeAlert()
                    return
                }
            }
         }
        catch(error) {
            console.log(error)
        }
       }

    const navegaEditar = async (pId, pNome, pIdade) => {
        navigation.navigate('EditarCliente',{id:pId,nome:pNome, idade:pIdade})
    }

    const listarClientes = async () => {
        try {
            const response = await api.get('/clientes')
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
                if(response.data.length > 0 ) {
                    let temp = [];
                    for(let i =0; i < response.data.length  ; i++) {
                        temp.push(response.data[i]);
                        setFlatListClientes(temp)
                    }
                    temp=[];
                }else{
                    setAlertMessage('nenhum registro foi localizado!')
                    exibeAlert()
                    return
                }
            }
         }
        catch(error) {
            console.log(error)
        }
       }

       useFocusEffect(
        React.useCallback(() => {
            listarClientes();
        },[refresh])) // executa listarclientes quando tiver alteração no usestate (variavel) refresh

       let listViewItem = (item) => {
        return(
            <View style={[styles.modeloCard]}>
                <View style={{display:'flex', flexDirection:'row', alignItems:'center', gap:5}}>
                    <Text style={styles.textHeader}>ID:</Text>
                    <Text style={styles.textValue}>{item.id}</Text>
                </View>
               
                <View style={{display:'flex', flexDirection:'row', alignItems:'center', gap:5}}>
                    <Text style={styles.textHeader}>nome:</Text>
                    <Text style={styles.textValue}>{item.nome}</Text>
                </View>
                
                <View style={{display:'flex', flexDirection:'row', alignItems:'center', gap:5}}>
                    <Text style={styles.textHeader}>idade:</Text>
                    <Text style={styles.textValue}>{item.idade}</Text>
                </View>
               

                <View style={styles.containerButton}>
                    <TouchableOpacity  onPress={()=> {
                        console.log('chegou botão editar')
                        navegaEditar(item.id,item.nome,item.idade)
                    }}>
                        <FontAwesome5 name='pen' color='blue' size={20}/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        Alert.alert(
                            'Atenção!!',
                            `Tem certeza que deseja excluir o cliente "${item.nome}"?`,
                            [
                                {text:'Sim', onPress:() => {deletaCliente(item.id)}},
                                {text:'Não', onPress:() => {return}}
                            ]
                        )
                    }}> 
                        <FontAwesome5 name='trash' color='red' size={20}/>
                    </TouchableOpacity>
                </View>
            </View>
        )
       }

       return (
        <View style={{flex:1, backgroundColor:'yellow'}}>
            <View>
                <FlatList
                    style={{marginTop:20}}
                    contentContainerStyle={{paddingHorizontal:10}}
                    data={flatListClientes}
                    keyExtractor={(item, index)=> index.toString()}
                    renderItem={({item}) => listViewItem(item)}/>

            </View>
            {showAlert && (Alert.alert('atenção!!',alertMessage,[{text:'OK', onPress: () => setShowAlert(false)}]))}
        </View>
       )
    
}




const styles = StyleSheet.create({
    containerButton: {
        flex:1,
        justifyContent:'space-between',
        flexDirection:'row',
        justifyContent:'flex-end',
        gap:5
    },  
    modeloCard: {
        backgroundColor:'white',
        marginBottom:30,
        padding:15,
        borderRadius:10,
        elevation:200,
    },
    textHeader: {
        color:'black',
        fontSize:14,
        fontWeight:'bold',
    },
    textValue: {
        color:'black',
        fontSize:18
    }
})