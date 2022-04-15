import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Login from '../component/Login';
import MainPage from '../component/MainPage';
import SignUp from '../component/SignUp';
import DateTest from '../test/Date';
import LocalStorage from '../test/LocalStorage';
import DeviceInfo from 'react-native-device-info';


const Route = () => {

    const Stack = createStackNavigator();

    // const state = useSelector(state => state);
    // const dispatch = useDispatch();

    // dispatch({ type: "SET_DEVICE", action: DeviceInfo.getUniqueId()});
    // console.log("!23");

    // React.useEffect(()=>{
    //     if(state?.deviceID === undefined){
    //         dispatch({type:"SET_DEVICE", action:DeviceInfo.getUniqueId()});
    //         console.log(state.deviceID);
    //     }
    //     // console.log(state?.deviceID);
    // },[])

    return <>
        <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name='Test1' component={DateTest}/>
            {/* <Stack.Screen name='Test' component={LocalStorage}/> */}
            <Stack.Screen name='Login' component={Login}/>
            <Stack.Screen name='SignUp' component={SignUp}/>
            <Stack.Screen name='Main' component={MainPage}/>
        </Stack.Navigator>
    </>

}

export default Route;