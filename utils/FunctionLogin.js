import AsyncStorage from "@react-native-async-storage/async-storage";

Date.toLocaleString('ko-KR');

export const getDate = () => { // 현재 날짜
    const date = new Date();
    let result = {"year":date.getFullYear(), "month":date.getMonth(), "date":date.getDate()};
    return result;
}

export const insertLocal = () =>{
    AsyncStorage.setItem("date",JSON.stringify(getDate()))
    return;
}

// 프로덕션 모드에선 Math 함수가 아닌 uuid 모듈이나 다른 랜덤 함수 사용 필요
export const getRandom = () => { 
    let ranNum = Math.random(10).toString();
    // console.log(ranNum.substring(2,6));
    return ranNum.substring(2,6);
}

export const clearLocal = () =>{
    AsyncStorage.clear();
    return;
}