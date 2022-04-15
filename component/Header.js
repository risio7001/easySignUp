import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { D_Height } from '../utils/DeviceSize';

const Header = ({ navigation, title }) => {

    return <>
        {/* <Pressable onPress={() => navigation.goBack()} style={{ height: D_Height * 6 / 100, flexDirection: 'column', justifyContent: 'center', backgroundColor: '#FCFCFC' }}>
            <View style={{ flexDirection: 'row', paddingHorizontal: 22, alignItems:'center' }}>
                <Text style={{ flex: 1, height:'100%' }}>
                    <Text style={{ color: '#0091EA', textAlign: 'left', fontSize: 13, fontWeight: '400' }}></Text>

                </Text>
                <Text style={{ flex: 1, height:'100%', alignSelf:'center' }}>
                    <Text style={{ flex: 1, textAlign: 'center', textAlign: 'center', fontWeight: '700', fontSize: 20, color: '#494949' }}> 회원가입 </Text>

                </Text>
                <Text style={{ flex: 1, height:'100%' }}>
                        <Text style={{ flex: 1, color: '#0091EA', textAlign: 'right', textDecorationLine: 'underline', fontSize: 13, fontWeight: '400' }}>알림목록</Text>
                </Text>
            </View>
        </Pressable> */}

        <Pressable onPress={() => navigation.goBack()} style={{ height: D_Height * 6 / 100, flexDirection: 'column', justifyContent: 'center', backgroundColor: '#FCFCFC' }}>
            <View style={{ flexDirection: 'row', paddingHorizontal: 22 }}>
                <View style={{ flex:1, flexDirection:'column', justifyContent:'center'}}><Text style={{textAlign:'left'}}>left</Text></View>
                <View style={{ flex:1, flexDirection:'column', justifyContent:'center'}}><Text style={{textAlign:'center', fontSize:20, fontWeight:'700', color:'#494949' }}>회원가입</Text></View>
                <View style={{ flex:1, flexDirection:'column', justifyContent:'center'}}><Text style={{textAlign:'right', textDecorationLine:'underline', color:'#0091EA'}}>알림목록</Text></View>
            </View>
        </Pressable>

    </>

}

export default Header;