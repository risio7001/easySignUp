import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { clearLocal, getRandom, insertLocal, selectLocal } from '../utils/FunctionLogin';



const DateTest = ({navigation}) => {
    // const showDate = () => {
    //     console.log(getRandom())
    // }
    // Date.toLocaleString('ko-KR');

    // const getDate = () => { // 현재 날짜
    //     const date = new Date();
        
    //     // let result = new Date(date.getFullYear(),date.getMonth(), date.getDate());
    //     let result = {"year":date.getFullYear(), "month":date.getMonth(), "date":date.getDate()};
    //     console.log(result);
    //     // let result_2 = new Date(year,month_1,day_2);
    //     // console.log(result_2 < result); // 지남

    //     // console.log(result);

    //     return result;

    //     //milliceond
    //     // if (date.getMilliseconds() < 10) {
    //     //     msecond = "00" + date.getMilliseconds().toString()
    //     // }
    //     // else if (date.getMilliseconds() > 10 && date.getMilliseconds() < 100) {
    //     //     msecond = "0" + date.getMilliseconds().toString()
    //     // }
    //     // else {
    //     //     msecond = date.getMilliseconds().toString()
    //     // }
    // }

    // const insertDate = () =>{
    //     // console.log(getDate());
    //     AsyncStorage.setItem("date",JSON.stringify(getDate()));
    // }

    // const showDate = () => {
    //     // console.log(getDate());
    //     AsyncStorage.getItem('date', (err, result)=>{
    //         let result_date = JSON.parse(result);
    //         console.log(JSON.parse(result).date);

    //         let baseValue = new Date(result_date.year, result_date.month, result_date.date);
    //         console.log(baseValue);
    //         // 현재 날?짜와 비교해서 만료상태인지 비교


    //         // console.log(typeof(JSON.parse(result).date));
            
    //         // console.log(parseInt(JSON.parse(result).date))
    //         // if(parseInt(JSON.parse(result).date) < getDate()){
    //         //     console.log("지남");
    //         // }
    //         // else{
    //         //     console.log("안지남");
    //         // }
    //         // ;
    //     })
    // }

    // const getRandom = () => {
    //     let ranNum = Math.random(10).toString();
    //     console.log(ranNum.substring(2,6));
    // }

    const getDate = () => {
        AsyncStorage.getItem("date", (err, result) => {
            if (err) { console.log(err); }

            if (result === null) {
                console.log('데이터없음');
            }
            else {
                console.log(result);
            }
        })
    }

    const insertDate = () => {
        insertLocal();
    }

    const next = () =>{
        navigation.navigate("Login");
    }

    return <>
        <Text>LocalStorage 저장용 테스트 화면</Text>
        <Text>{}</Text>
        <Text onPress={() => getDate()}>로컬 데이터 가져오기</Text>
        <Text onPress={() => insertDate()}>로컬 데이터 저장하기</Text>
        <Text onPress={() => clearLocal()}>로컬 데이터 초기화</Text>
        <Text onPress={() => next()}>다음단계</Text>
        {/* <Text onPress={()=>test()}>TEST</Text> */}
    </>

}

export default DateTest;