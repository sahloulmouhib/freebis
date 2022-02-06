
import React,{useState,useEffect} from 'react'
import {View,Text,StyleSheet,Button, FlatList, TouchableOpacity} from 'react-native'
import api from "../api/api"

const PatientsScreen=({route,navigation}) =>{
    const mouhib=["ddd","ddd","dadqd"]
    const { id} = route.params;
    const[patients,setPatients]=useState([])
    const[gps,setGps]=useState([])
    const[allGps,setAllGps]=useState([])
    const[assocaitedGps,setAssocaitedGps]=useState([])
    const[temp,setTemp]=useState(false)


    
   // console.log("patients",patients.length)
    //console.log("all gps",allGps.length)
    
    console.log("assocaitedGps",assocaitedGps)
    
    //console.log("gps",gps.length)

    //console.log("temp",temp)
    
    const getPatients=async()=>{
        const response=await api.get(`/patients.json`)
        const result=response.data.filter(element=>{return element.careHomeId==id})
        setPatients(result)
        //console.log("response 1",patients.length)
     
    }

    const getAllGps=async()=>{
        const response=await api.get(`/gp_practices.json`)
        setAllGps(response.data)
        //console.log("response 1",patients.length)
     
    }



    const getGps=async()=>{
        const response=await api.get(`/gp_practices_patients.json`)
        setGps(response.data)
        console.log("response 2",patients.length)
       
    }

    const getAssocaitedGpsId=(id)=>{
        const result=gps.filter(element=>{return element.patientId==id}).map(element=>{return element.gpPracticeId})
        //console.log("response",response.data)
        return result
       
    }
    const getAssociatedGps =()=>{
        let array=[]
        console.log("patients ddddddddddd",patients.length)
        for(let i=0;i<patients.length;i++)
        {
            //console.log("i =",i)
            let gpArray=getAssocaitedGpsId(patients[i].id)
            if(gpArray.length!=0)
            {
                array.push({patientId: patients[i].id, patientsGps:gpArray})
            }
            
            
        }
        
       setAssocaitedGps(array)
       console.log("response 3",assocaitedGps.length)
    }


    const finalGps=(item)=>{
        let array=[]
        console.log(item.id)
        let first=assocaitedGps.find(element=>{return element.patientId==item.id})
        if(first!=undefined)
        {
            first.patientsGps.forEach(gp => {
                console.log(gp)
                let second=allGps.find(element=>{return element.id==gp})
                if(second!=undefined)
                {
                    array.push(second.name)
                }
                
            });
        }
        console.log(array)
       
       
        
        return array
    }


    useEffect(() => {
        getPatients()
        getGps()
        getAllGps()
    }, [])

   useEffect(() => {
        if(patients.length!=0 && gps.length!=0)
        {
            getAssociatedGps()
            
        }
       
        
        
    }, [patients,gps])


    useEffect(() => {
        if(patients.length!=0 && gps.length!=0 && assocaitedGps.length!=0 && allGps.length!=0)
        {
            setTemp(true)
            
        }
       
        
        
    }, [patients,gps,assocaitedGps,allGps])




    return <View>
        <Text>Patients Screen</Text>
        {patients.length !=0 ?
        <FlatList 
           
        //or horizontal
       data={patients}
       keyExtractor={patient=>patient.id}
       renderItem={ ({item})=>{
           return ( <TouchableOpacity onPress={()=>{
               console.log(item.id)
               navigation.navigate('Checkups',{patient:item})}}>
             <Text style={{color:"black"}}> {item.firstName} - {item.lastName}</Text>
            
             <Text style={{color:"black"}}> {}</Text>
             {temp?<Text>{finalGps(item)}</Text>:null}
             <TouchableOpacity onPress={()=>{finalGps}}></TouchableOpacity>
           </TouchableOpacity>
        
            )
               
       }}/>
: null}
        
    </View>
}

const styles=StyleSheet.create({})

export default PatientsScreen