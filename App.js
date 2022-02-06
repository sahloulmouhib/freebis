// In App.js in a new project
import CareHomesScreen from './screens/CareHomesScreen';
import PatientsScreen from './screens/PatientsScreen';
import CheckupsScreen from './screens/CheckupsScreen';
import PatientsTempScreen from './screens/PatientsTempScreen';
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PatientsTemp">
        <Stack.Screen name="Home" component={CareHomesScreen} />
        <Stack.Screen name="PatientsTemp" component={PatientsTempScreen} />
        <Stack.Screen name="Patients" component={PatientsScreen} />
        <Stack.Screen name="Checkups" component={CheckupsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;