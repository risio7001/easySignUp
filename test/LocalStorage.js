import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import { Pressable, Text, View } from 'react-native';


const LocalStorage = () => {

    const [data, setData] = React.useState("미출력");

    const insert = () =>{
        AsyncStorage.setItem('login', JSON.stringify({'phone':123123, "date":"ksdnfas"}));
        alert("저장완료");
    }

    const get = () => {
        AsyncStorage.getItem("login", (err, result)=>{
            const info = JSON.parse(result);
            console.log(info.phone);
        })
    }
    
    return <>
        <Text onPress={()=>insert()}>저장</Text>
        <Text onPress={()=>get()}>불러오기</Text>
        <Text>{data}</Text>
    </>

}

export default LocalStorage;