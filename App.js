import React, { useEffect, useState } from 'react';
import {
  LogBox,
  SafeAreaView,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import firestore from '@react-native-firebase/firestore';
import { NavigationContainer } from '@react-navigation/native';
import Header from './component/Header';
import Route from './router/Route';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './store';

const App = () => {

  const db = firestore().collection('user');
  const [data, setData] = useState("");

  const add = () =>{
    
    // db.get().then((querySnapshot)=>{
    //   querySnapshot.forEach((doc)=>{
    //     // console.log(doc.data().deviceID);
    //     setData(doc.data())
    //   })
    // })
    // if(data.deviceID === id){
    //   alert('가입내역이 있는 기기 입니다.');
    // }
    // else {
    //    db.add({
    //     deviceID: id
    //   })
    //   .then(res => console.log("succes"))
    //   .catch(err => console.log(err))
    // }
  }

  LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
    "ViewPropTypes will be removed",
    "ColorPropType will be removed",
    "RCTBridge required dispatch_sync to load RNGestureHandlerModule. This may lead to deadlocks",
  ]);

  return <>
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaView />
        {/* <Header /> */}
        <Route />
      </NavigationContainer>
    </Provider>
    </>
};

export default App;
