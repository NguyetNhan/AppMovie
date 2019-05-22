import AsyncStorage from '@react-native-community/async-storage';

const InfoUser = value => {
        return {
                full_name: value.full_name,
                email: value.email,
                gender: value.gender,
                birthday: value.birthday
        };
};


onUpdate = async (user) => {
        try {
                await AsyncStorage.mergeItem('login', JSON.stringify(user));
                let value = await AsyncStorage.getItem('login');
                console.log('value onUpdate : ', value);
        } catch (error) {
                console.error('InfoUser: ', error);
        }
};

export const Local = {
        onUpdate
};















