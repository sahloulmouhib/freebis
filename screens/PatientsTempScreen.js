
import axios from 'axios'
import React,{useState,useEffect} from 'react'
import {View,Text,StyleSheet,Button, FlatList, TouchableOpacity} from 'react-native'
import api from "../api/api"

const PatientsTempScreen=({route,navigation}) =>{
    const mouhib=["ddd","ddd","dadqd"]

    const[patients,setPatients]=useState([])
    const[gps,setGps]=useState([])
    const[allGps,setAllGps]=useState([])
    const[assocaitedGps,setAssocaitedGps]=useState([])
    const[temp,setTemp]=useState(false)


    const fetchAll=async()=>{
        try{
            let url1="/patients.json";
            let url2="/gp_practices.json";
            let url3 ="/gp_practices_patients.json"
            let request1=api.get(url1);
            let request2=api.get(url2);
            let request3=api.get(url3)
            const [r0,r1,r2] = await Promise.all([request1, request2, request3]);

            console.log("r0",r0.data.length)
            console.log("r1",r1.data.length)
            console.log("r2",r2.data.length)

            console.log("patients",patients.length)
            console.log("all gps",allGps.length)
            console.log("gps",gps.length)
            let res1=await request1
            let res2=await request2
            let res3=await request3
            console.log("res1",res1.data.length)
            console.log("res2",res2.data.length)
            console.log("res3",res3.data.length)
            console.log('finished')
        }
        catch(err)
        {
            console.error(err)
        }
    
    }
    const fetchAll2=async()=>
    {
        const result = await Promise.all([getPatients(), getAllGps(), getGps()])
            console.log("patients",patients.length)
            console.log("all gps",allGps.length)
            console.log("gps",gps.length)
            console.log("bassa")
        
        
        
    }
   // console.log("patients",patients.length)
    //console.log("all gps",allGps.length)
    
    //console.log("assocaitedGps",assocaitedGps)
    
    //console.log("gps",gps.length)

    //console.log("temp",temp)
    
    const getPatients=async()=>{
        const response=await api.get(`/patients.json`)
        //const result=response.data.filter(element=>{return element.careHomeId==id})
        setPatients(response.data)
        console.log("phase 1")
        //console.log("response 1",patients.length)
     
    }

    const getAllGps=async()=>{
        const response=await api.get(`/gp_practices.json`)
        setAllGps(response.data)
        console.log("phase 2")
        //console.log("response 1",patients.length)
     
    }



    const getGps=async()=>{
        const response=await api.get(`/gp_practices_patients.json`)
        setGps(response.data)
        console.log("phase 3")
       
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
        fetchAll()
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
      
        
    </View>
}

const styles=StyleSheet.create({})

export default PatientsTempScreen