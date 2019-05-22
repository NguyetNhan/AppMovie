
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

const ListMovie = value => {
        return {
                list_movie: value
        };
};

onUpdateViewMovie = async (movieId) => {
        try {
                let result = await AsyncStorage.getItem('movie');
                console.log('result: ', JSON.parse(result));
                let list = JSON.parse(result);
                for (let m of list.list_movie) {
                        if (m.id === movieId) {
                                m.views++;
                        }
                }
                await AsyncStorage.mergeItem('movie', JSON.stringify(list));
                //  for (let m of result)
        } catch (error) {
                console.log('error onFetchMovieLocal: ', error);
        }
};

onFetchMovieLocal = async (data) => {
        try {
                var result = await AsyncStorage.getItem('movie');
                if (result === null) {
                        await AsyncStorage.setItem('movie', JSON.stringify(ListMovie(data.data)));
                } else {
                        let receiver = JSON.parse(result);
                        for (j = 0; j < data.data.length; j++) {
                                var checkExistListMovie = false;
                                for (i = 0; i < receiver.list_movie.length; i++) {
                                        if (receiver.list_movie[i].id === data.data[j].id) {
                                                checkExistListMovie = true;
                                        }
                                }
                                if (!checkExistListMovie) {
                                        receiver.list_movie.push(data.data[j]);
                                }
                        }
                        await AsyncStorage.setItem('movie', JSON.stringify(receiver));
                }
                var log = await AsyncStorage.getItem('movie');
                //   console.log('log onFetchMovieLocal: ', JSON.parse(log));
                return JSON.parse(log);
        } catch (error) {
                console.log('error onFetchMovieLocal: ', error);
        }
};

onFetchMovieOffline = async () => {
        try {
                var log = await AsyncStorage.getItem('movie');
                //   console.log('log onFetchMovieLocal: ', JSON.parse(log));
                return JSON.parse(log);
        } catch (error) {
                console.log('error onFetchMovieOffline: ', error);
        }
};


onLike = async (value) => {
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

onFetchUser = async () => {
        //   console.log('user onFetchUser: ', user);
        try {
                let value = await AsyncStorage.getItem('login');
                return JSON.parse(value);
        } catch (error) {
                console.log('error onFetchUser : ', error);
        }
};

onLogoutLocal = async () => {
        try {
                await AsyncStorage.removeItem('login');
        } catch (error) {
                console.log('error onLogoutLocal : ', error);
        }
};

export const Local = {
        onLike, onListLikeMoveOfUser, onFetchUser, onFetchMovieLocal, onFetchMovieOffline, onLogoutLocal, onUpdateViewMovie
};
