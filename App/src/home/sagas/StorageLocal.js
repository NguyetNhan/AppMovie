
import AsyncStorage from '@react-native-community/async-storage';

const Like_dao = value => {
        return {
                like: [{ movie: value.movieId, status: true }]
        };
};

const InfoUser = value => {
        return {
                full_name: value.full_name,
                email: value.email,
                gender: value.gender,
                birthday: value.birthday
        };
};


onLike = async (value) => {
        console.log(JSON.stringify(Like_dao(value)));
        try {
                var data = await AsyncStorage.getItem(value.user);
                if (data == null) {
                        await AsyncStorage.setItem(value.user, JSON.stringify(Like_dao(value)));
                } else {
                        let receiver = JSON.parse(data);
                        var checkMovieExist = false;
                        // check post len
                        for (let m of receiver.like) {
                                if (m.movie == value.movieId) {
                                        checkMovieExist = true;
                                        if (m.status) {
                                                m.status = false;
                                        } else {
                                                m.status = true;
                                        }
                                        await AsyncStorage.mergeItem(value.user, JSON.stringify(receiver));
                                }
                        }
                        if (!checkMovieExist) {
                                receiver.like.push({ movie: value.movieId, status: true });
                                await AsyncStorage.setItem(value.user, JSON.stringify(receiver));
                        }
			/* console.log('receiver: ', receiver);
            receiver.like.push({movie: value.movieId, status: true})
            await AsyncStorage.setItem(value.user, JSON.stringify(receiver)) */
                }
                console.log('data: ', JSON.parse(data));
        } catch (error) {
                console.error(error);
        }
};

onListLikeMoveOfUser = async (user) => {
        try {
                let listLike = await AsyncStorage.getItem(user);
                return JSON.parse(listLike);
        } catch (error) {
                console.log('error onListLikeMoveOfUser: ', error);
        }
};

onFetchUser = async (user) => {
        //   console.log('user onFetchUser: ', user);
        try {
                let value = await AsyncStorage.getItem(user.id.concat('info'));
                if (value === null) {
                        await AsyncStorage.setItem(user.id.concat('info'), JSON.stringify(InfoUser(user)));
                        return user;
                } else {
                        return value;
                }
        } catch (error) {
                console.log('error onFetchUser : ', error);
        }
};

export const Local = {
        onLike, onListLikeMoveOfUser, onFetchUser
};
