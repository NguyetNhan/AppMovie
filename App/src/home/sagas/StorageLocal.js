import AsyncStorage from '@react-native-community/async-storage';

const Like_dao = value => {
    return {
        like: [{ movie: value.movieId, status: true }]
    }
}


onLike = async (value) => {
    console.log(JSON.stringify(Like_dao(value)));
    try {
       
        var data = await AsyncStorage.getItem(value.user)
        if(data==null){
            await AsyncStorage.setItem(value.user, JSON.stringify(Like_dao(value)))
        }else{
            let receiver = JSON.parse(data)
            var checkMovieExist = false
            // check post len
            for(let m of receiver.like){
                if(m.movie==value.movieId){
                    checkMovieExist= true
                    if(m.status){
                        m.status=false
                    }else{
                        m.status=true
                    }
                    await AsyncStorage.mergeItem(value.user,JSON.stringify(receiver))
                }
            }
            if(!checkMovieExist){
                receiver.like.push({movie: value.movieId, status: true})
                await AsyncStorage.setItem(value.user, JSON.stringify(receiver))
            }
            /* console.log('receiver: ', receiver);
            receiver.like.push({movie: value.movieId, status: true})
            await AsyncStorage.setItem(value.user, JSON.stringify(receiver)) */
        }
        console.log('data: ', JSON.parse(data));
    } catch (error) {
        console.error(error);
    }
}

onListLikeMoveOfUser = async (user)=>{
    try {
        let listLike = await AsyncStorage.getItem(user)
        return JSON.parse(listLike) 
    } catch (error) {
        console.log('error: ', error);
    }
}

export const Local = {
    onLike,onListLikeMoveOfUser
}
