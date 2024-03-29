import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import Home from './src/pages/Home';
import DetalhesCliente from './src/pages/DetalhesCliente';
import NovoCliente from './src/pages/NovoCliente';
import TodosClientes from './src/pages/TodosClientes';
import DeletarCliente from './src/pages/DeletarCliente';
import EditarCliente from './src/pages/EditarCliente';


export default function App() {
  return (
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name='Home' component={Home}/>
            <Stack.Screen options={{title:"Detalhes Clientes"}} name='DetalhesCliente' component={DetalhesCliente}/>
            <Stack.Screen options={{title:"Novo Cliente"}} name='NovoCliente' component={NovoCliente}/>
            <Stack.Screen options={{title:"Verificar Clientes"}} name='TodosClientes' component={TodosClientes}/>
            <Stack.Screen options={{title:"Deletar um cliente"}} name='DeletarCliente' component={DeletarCliente}/>
            <Stack.Screen options={{title:"Editar clientes"}} name='EditarCliente' component={EditarCliente}/>
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
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
});
