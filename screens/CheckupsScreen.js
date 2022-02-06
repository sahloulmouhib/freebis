
import React,{useState,useEffect} from 'react'
import {View,Text,StyleSheet,Button, FlatList, TouchableOpacity} from 'react-native'
import api from "../api/api"

const CheckupsScreen=({route,navigation}) =>{
   
    const { patient} = route.params;
    console.log(patient)
    const[checkups,setCheckups]=useState([])
    console.log(checkups)
    
    
    const getCheckups=async()=>{
        const response=await api.get(`/checkups.json`)
        const result=response.data.filter(element=>{return element.patientId==patient.id})
        //console.log("response",response.data)
        setCheckups(result)
        
    }

  


    useEffect(() => {
        getCheckups()
        
    }, [])

    return <View>
        <Text>{patient.firstName}</Text>
        {checkups.lenghth !=0 ?
        <FlatList 
           
        //or horizontal
       data={checkups}
       keyExtractor={checkup=>checkup.id}
       renderItem={ ({item})=>{
           return ( <TouchableOpacity onPress={()=>navigation.navigate('Checkups',{id:item.id})}>
             <Text style={{color:"black"}}> {item.createdAt}</Text>
             <Text style={{color:"black"}}> {}</Text>
             
           </TouchableOpacity>
            )
               
       }}/>
: null}
        
    </View>
}

const styles=StyleSheet.create({})

export default CheckupsScreen