import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { D_Height } from '../utils/DeviceSize';
import Header from './Header';

const MainPage = ({navigation}) => {

    return <>
        <Header />
        <View style={{ height: D_Height, paddingHorizontal: 16 }}>
            <View style={{marginTop:D_Height*13/100}}>
                <Text style={{ color: '#494949', fontSize: 55, fontWeight: '700' }}>안녕하세요!</Text>
                <Text style={{ fontSize: 21, fontWeight: '700', color: '#494949', marginVertical:13 }}>어쩔포토에 오신걸 환영합니다.</Text>
                <Text style={{ fontSize: 13, fontWeight: '400', color: '#767474' }}>오늘까지 회원수</Text>
                <Text style={{ color: '#767474', fontSize: 13, fontWeight: '400', marginTop:8 }}>100명</Text>
            </View>
            
            <Pressable
                onPress={() => navigation.navigate('SignUp')}
                style={{ backgroundColor: '#3A66FF', borderRadius: 4, marginVertical: 10, paddingVertical: 15, marginTop:D_Height*48/100 }}>
                <Text style={{ color: 'white', alignSelf: 'center', fontSize: 15 }}>회원 가입하기</Text>
            </Pressable>
        </View>
    </>

}

export default MainPage;