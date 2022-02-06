
import React,{useState,useEffect} from 'react'
import {View,Text,StyleSheet,Button, FlatList, TouchableOpacity} from 'react-native'
import api from "../api/api"

const CareHomesScreen=({navigation}) =>{
    const[careHomes,setCareHomes]=useState([])
  //console.log("careHomes",careHomes)
    

    const getCareHomes=async()=>{
        const response=await api.get(`/care_homes.json`)
        //console.log("response",response.data)
        setCareHomes(response.data)
    }
    useEffect(() => {
        getCareHomes()
    }, [])

    
 
   


    return <View>
        <Text>Care Homes Screen</Text>
        {careHomes.length !=0 ?
        <FlatList 
           
             //or horizontal
            data={careHomes}
            keyExtractor={home=>home.id}
            renderItem={ ({item})=>{
                return ( <TouchableOpacity onPress={() => navigation.navigate('Patients',{id:item.id})}>
                  <Text style={{color:"black"}}> {item.name}</Text>
                </TouchableOpacity>
                 )
                    
            }}/>
            : null}
        
        <Button
        title="Patients"
        onPress={() => navigation.navigate('Patients')}
      />
      
    </View>
}

const styles=StyleSheet.create({})

export default CareHomesScreen