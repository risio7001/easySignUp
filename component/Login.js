import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { D_Height } from '../utils/DeviceSize';
import Header from './Header';
// import DeviceInfo from 'react-native-device-info';
// import DeviceInfo from 'react-native-device-info' ; 

const Login = ({navigation}) => {
    // DeviceInfo.getUniqueId().then(uniqueID=>{
    //     console.log(uniqueID);
    // })
    // const id = DeviceInfo.getDeviceName();
    // console.log(id);
    const getLocal = () =>{
        AsyncStorage.getItem("date", (err, result)=>{
            if(err){console.log(err)}
            
            if(result === null){
                alert('회원가입 필요');
            }
            else{
                alert('바로 로그인');
            }
        })
    }

    React.useEffect(()=>{
        getLocal();
    },[]);

    return <>
    <Header/>
        <View style={{ flexDirection: 'column' }}>
            <View style={{ height: D_Height * 64 / 100, backgroundColor: 'grey' }}>
 
            </View>
            <View style={{ height: D_Height * 30 / 100 }}>
                <View style={{ marginVertical: 10, marginHorizontal: 10 }}>
                    <Text onPress={()=>navigation.goBack()} style={{ fontSize: 32, fontWeight: '700' }}>어쩔포토</Text>
                    <Text style={{ color: '#767474', fontSize: 15, paddingVertical: '2%' }}>서비스 소개문구가 들어오는 자리입니다. 서비스 소개문구가 들어오는 자리입니다.</Text>
                    <Pressable 
                    onPress={()=>navigation.navigate('SignUp')}
                    style={{ backgroundColor: '#3A66FF', borderRadius: 4, marginVertical: 10, paddingVertical: 15 }}>
                        <Text style={{ color: 'white', alignSelf: 'center', fontSize: 15 }}>서비스 시작하기</Text>
                    </Pressable>
                    <Text onPress={()=>navigation.navigate('Main')} style={{ color:"#0091EA", textDecorationLine:'underline', fontSize:14}}>일단 구경할래요</Text>
                </View>
            </View>
        </View>
    </>

}

export default Login;