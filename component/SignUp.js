import * as React from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { D_Height } from '../utils/DeviceSize';
import {  BottomAlert } from 'react-native-modal-bottom-alert';
import { NavigationContainer } from '@react-navigation/native';
import { getDate, getRandom } from '../utils/FunctionLogin';
import { useSelector } from 'react-redux';
import firebase from '@react-native-firebase/firestore';
import DeviceInfo from 'react-native-device-info';


const SignUp = ({navigation}) => {

    const db = firebase().collection('user')

    const [phone, setPhone] = React.useState("");
    const [certification, setCertification] = React.useState("");
    const [check, setCheck] = React.useState(false);
    const [certiOk, setCertiOk] = React.useState(false);


    const [sec, setSec] = React.useState(0);
    const [min, setMin] = React.useState(5);
    const time = React.useRef(300);
    const timerId = React.useRef(null);
    const [sendInterval, setSendInterval] = React.useState(true);

    const [sendCnt, setSendCnt] = React.useState(4);

    let num = 4;

    React.useEffect(()=>{
        const getRemaining = () => {    // 첫 진입시 디바이스 고유값으로 db 접속 후 남은 횟수 가져오기
            db.doc(DeviceInfo.getUniqueId())
            .get()
            .then((doc)=>{
                if(doc.exists){
                    num = doc.data().count;
                    if(doc.data().count < 1){
                        setSendInterval(false);
                    }
                    setSendCnt(num);
                }
            })
        }
        getRemaining();
    },[]);

    const counting = () => {

        if(phone.length !== 11){    //  번호 입력이 틀렸을 경우
            return
        }

        if(sendCnt < 1){    // 문자 발송 횟수가 초과한 경우 return
            return
        }
        
        setCheck(true);     // 인증번호 입력란 보이기

        if(sendInterval && sendCnt > 0){ // 발송 간격 20초가 지나고 발송 횟수가 남아있을 경우
            let ranNum = getRandom();
            alert("인증번호 : " + ranNum);  // 문자 발송
            getSendCnt(ranNum); // db에 데이터 넣기
        }
        else{
            return;
        }

        setSendInterval(false); // 발송간격 20초간 재발송 불가

        if(time.current !== 300){   // 타이머가 돌아가고 있지만 미 인증 후 재 발송 원하는 경우
            time.current = 300; // 타이머 시간 초기화
            clearInterval(timerId.current); // 타이머 정지
        } 
        timerId.current = setInterval(() => {
            setMin(parseInt(time.current / 60));
            setSec(time.current % 60);
            time.current -= 1;
            if(time.current === 279){   // 20초가 지났을 때 한번만 접근하게 === 사용
                setSendInterval(true);
            }
        }, 1000);
        return () => {clearInterval(timerId.current)};
    }

    React.useEffect(()=>{   //  타이머가 - 값이 나지 않도록 하기 위해 추가
        if(time.current < 0){
            clearInterval(timerId.current);
        }
    },[sec]);

    const pushDB = (num, ranNum) => {
        db.doc(DeviceInfo.getUniqueId()).set({
            "phone":phone,
            "date":getDate(),
            "count":num,
            "certificationNum":ranNum
        })
        .then(()=>{
            console.log("요청완료")
        })
        .catch((err)=>console.log(err))
    }

    const getSendCnt = (ranNum) => {
        db.doc(DeviceInfo.getUniqueId())
        .get()
        .then((doc)=>{
            if(doc.exists){
                if(doc.data().count > 0){
                    num = doc.data().count - 1;
                    console.log(num);
                    setSendCnt(num);
                    pushDB(num, ranNum)
                }
            }
            else{
                setSendCnt(num);
                pushDB(num, ranNum)
            }
        })
    }

    const certificationSend=()=>{
        if (certification.length !== 4) {
            return;
        }

        db.doc(DeviceInfo.getUniqueId())
        .get()
        .then((doc)=>{
            if(doc.exists){
                if(certification === doc.data().certificationNum){
                    console.log("동일");
                    modalBottom.onOpenAlert('success', '가입 완료!', '환영합니다 000님\n가입이 성공적으로 완료되었습니다',
                        () => {
                            navigation.replace('Main');
                            clearInterval(timerId.current);
                        }
                    );
                }
                else{
                    setCertiOk(false);
                }
            }
            else{
                console.log("No Data");
            }
        })
    }

    React.useEffect(()=>{
        setCertiOk(true);
    },[certification])

    return <>
        <View style={{paddingHorizontal:16}}>
            <View style={{ height: D_Height * 1 / 10 }}>

            </View>
            <Text style={{ paddingVertical: 4, fontSize: 15, fontWeight: '400' }}>휴대폰 본인인증</Text>
            {sendInterval ?
                <Text style={{ paddingVertical: 4, color: '#B8B8B8', fontSize: 13 }}>서비스 가입을 위해 휴대폰 인증이 필요해요</Text>
                :
                check ?
                    <Text style={{ paddingVertical: 10, color: '#FD695B', fontSize: 13, fontWeight: '400' }}>아래 번호로 인증문자가 발송되었습니다.</Text>
                    :
                    <Text style={{ paddingVertical: 4, color: '#B8B8B8', fontSize: 13 }}>서비스 가입을 위해 휴대폰 인증이 필요해요</Text>
            }
            <TextInput
                style={{ color: sendInterval && sendCnt > 0 ? '#000000' : '#B8B8B8', paddingVertical:4, borderWidth:1, paddingVertical:10, paddingHorizontal:12, borderRadius:4, borderColor:'#E2E2E2' }}
                placeholder='01012345678'
                keyboardType='number-pad'
                onChangeText={setPhone}
                maxLength={11}
                editable={sendInterval && sendCnt > 0}
            />
            <Pressable
                onPress={() => {
                    counting()
                }}
                style={{ marginTop: 8, paddingVertical: 16, paddingHorizontal: 1, backgroundColor: phone.length === 11 && sendInterval && sendCnt > 0 ? '#3A66FF' : '#B8B8B8' }}>
                <Text style={{ color: 'white', alignSelf: 'center', fontWeight: '400', fontSize: 15 }}>인증문자 발송</Text>
            </Pressable>
            {sendCnt < 1 && !check ?
                <Text style={{ paddingVertical: 10, color: '#FD695B', fontSize: 13, fontWeight: '400' }}>문자 발송이 더 이상 불가능하니 내일 다시 시도해주세요</Text>
                :
                null
            }
            {
                check ?
                    <View>
                        {sendCnt < 1 ?
                            <Text style={{ paddingVertical: 10, color: '#FD695B', fontSize: 13, fontWeight: '400' }}>문자 발송이 더 이상 불가능하니 내일 다시 시도해주세요</Text>
                            :
                            sendInterval ?
                                <Text style={{ paddingVertical: 8, flexDirection: 'row' }}>
                                    <Text style={{ color: '#B8B8B8' }}>오늘 인증문자 발송은</Text>
                                    <Text style={{ color: '#FD695B' }}> {sendCnt}번 </Text>
                                    <Text style={{ color: '#B8B8B8' }}>더 가능해요</Text>
                                </Text>
                                :
                                <Text style={{ paddingVertical: 4, color: '#494949', fontSize: 13 }}>20초 후 인증문자 재발송이 가능해요</Text>
                        }

                        <View style={{ flexDirection: 'row', paddingHorizontal: 12, borderColor: '#B8B8B8', borderWidth: 1, borderRadius: 4, paddingVertical: 8 }}>
                            <TextInput
                                style={{ flex: 7 }}
                                placeholder='0000'
                                onChangeText={setCertification}
                                keyboardType='number-pad'
                                maxLength={4}
                                editable={time.current > 0}
                                // onFocus={setCertification("")}
                            />
                            <Text style={{ alignSelf: 'center', flex: 1, fontSize: 11 }}>{time.current <= 0 ? "time out" : `${min}: ${sec < 10 ? '0' + sec : sec} `}</Text>
                            <Pressable
                                onPress={() => certificationSend()}
                                style={{ borderRadius: 4, paddingVertical: 11, paddingHorizontal: 9, backgroundColor: certification.length === 4 ? '#3A66FF' : '#B8B8B8' }}>
                                <Text
                                    style={{ color: 'white', fontSize: 12 }}>확인</Text>
                            </Pressable>
                        </View>
                        {certiOk ? null :
                            <Text style={{ paddingVertical: 10, color: '#FD695B', fontSize: 13, fontWeight: '400' }}>잘못된 인증번호입니다. 확인 후 다시 입력해주세요.</Text>
                        }

                    </View>
                :null
            }
            <BottomAlert ref={(ref)=>modalBottom=ref}/>
        </View> 
    
    </>

}

export default SignUp;