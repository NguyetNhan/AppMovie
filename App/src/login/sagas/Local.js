import AsyncStorage from '@react-native-community/async-storage';


onSetUser = async (value) => {
        try {
                let result = await AsyncStorage.setItem('login', JSON.stringify(value));
                //  let data = await AsyncStorage.getItem('login');
                //   console.log('data: ', data);
                return result;
        } catch (error) {
                console.log('error onSetUser: ', error);
        }
};

export const Local = {
        onSetUser
};




