import DeviceInfo from 'react-native-device-info';

const initialState = {
    deviceID:""
}

// console.log(initialState.deviceID);

export const reducer = (state = initialState, action) => {
    switch(action.type){
        case "SET_DEVICE":
            state.deviceID = action.deviceID
            return state;
    }
}