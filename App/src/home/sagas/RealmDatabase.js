
const Realm = require('realm');


const MOVIE_SCHEMA = 'MovieSchema'
const USER_LIKE_SCHEMA = 'UserLikeSchema'

const MovieSchema = {
    name: MOVIE_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',
        movieId: 'int',
        status: { type: 'bool', default: false },
    }
}

const UserLikeSchema = {
    name: USER_LIKE_SCHEMA,
    primaryKey: 'userId',
    properties: {
        userId: 'int',
        like: { type: 'list', objectType: MOVIE_SCHEMA }
    }
}

const databaseOptions = {
    path: 'userLikeMovie.realm',
    schema: [MovieSchema, UserLikeSchema],
}



function* likeMovie(values) {

    // console.log('values.userId ', values.userId);
    // console.log('values.movieId ', values.movieId);
    const userId = parseInt(values.userId)
    const movieId = parseInt(values.movieId)
    const milliseconds = (new Date).getTime();

    new Promise((resolve, reject) => {
        Realm.open(databaseOptions).then(realm => {
            // them data mau
            /*  realm.write(() => {
                 let john = realm.create(USER_LIKE_SCHEMA, { userId: 1, like: [] });
                 john.like.push({ id: 1, movieId: 1, status: true });
                 john.like.push({ id: 2, movieId: 2, status: true });
                 john.like.push({ id: 3, movieId: 3, status: true });
                 john.like.push({ id: 4, movieId: 4, status: true });
                 john.like.push({ id: 5, movieId: 5, status: true });
     
                 let a = realm.create(USER_LIKE_SCHEMA, { userId: 2, like: [] });
                 a.like.push({ id: 11, movieId: 11, status: true });
                 a.like.push({ id: 12, movieId: 12, status: true });
                 a.like.push({ id: 13, movieId: 13, status: true });
                 a.like.push({ id: 14, movieId: 14, status: true });
     
                 let b = realm.create(USER_LIKE_SCHEMA, { userId: 3, like: [] });
                 b.like.push({ id: 111, movieId: 113, status: true });
                 b.like.push({ id: 112, movieId: 114, status: true });
             }); */

            //check user
            /* let searchUserExist = realm.objects(USER_LIKE_SCHEMA)
            for (let u of searchUserExist) {
                console.log(`check movie  ${u.userId}`);
            } */


            //check movie
            /*  let average = realm.objects(MOVIE_SCHEMA)
             for (let p of average) {
                 console.log(`check movie ${p.id}   ${p.status}`);
             } */

            // check cac movie da like cua user
            /* let searchUsercheck = realm.objectForPrimaryKey(USER_LIKE_SCHEMA, userId)
            for (let p of searchUsercheck.like) {
                console.log(`check movie ${p.id} ${p.movieId}   ${p.status}`);
            } */


            // xu li data
            /*  let searchUserExist = realm.objectForPrimaryKey(USER_LIKE_SCHEMA, userId)
             console.log('searchUserExist: ', searchUserExist);
             if (searchUserExist != null) {
                 console.log('searchUserExist!=null');
                 let searchMovieExist = realm.objectForPrimaryKey(MOVIE_SCHEMA, movieId)
                 if (searchMovieExist != null) {
                     console.log('searchMovieExist != null: ', searchMovieExist.id);
                     realm.write(() => {
                         if (searchMovieExist.status) {
                             realm.create(MOVIE_SCHEMA, { id: searchMovieExist.id, status: false }, true)
                             resolve()
                         } else {
                             realm.create(MOVIE_SCHEMA, { id: searchMovieExist.id, status: true }, true)
                             resolve()
                         }
                     })
                 } else {
                     console.log('searchMovieExist == null: ');
                     realm.write(() => {
                         searchUserExist.like.push({ id: milliseconds, movieId: movieId, status: true })
                         resolve()
                     })
                 }
             } else {
                 console.log('searchUserExist==null');
                 realm.write(() => {
                     let data = realm.create(USER_LIKE_SCHEMA, { userId: userId, like: [] });
                     data.like.push({ id: milliseconds, movieId: movieId, status: true });
                     resolve()
                 })
             } */


            let searchUserExist = realm.objectForPrimaryKey(USER_LIKE_SCHEMA, userId)
        //    console.log('searchUserExist: ', searchUserExist.like);
            if (searchUserExist != null) {
                console.log('searchUserExist!=null');
                var checkMovieExits = false
                for (let movie of searchUserExist.like) {
                    if (movie.movieId == movieId) {
                        console.log(`check movie exit: ${movie.id} ${movie.movieId} ${movie.status}`);
                        checkMovieExits = true
                        realm.write(() => {
                            if (movie.status) {
                                realm.create(MOVIE_SCHEMA, { id: movie.id, status: false }, true)
                                resolve()
                            } else {
                                realm.create(MOVIE_SCHEMA, { id: movie.id, status: true }, true)
                                resolve()
                            }
                        })
                        break
                    }
                }
                if(!checkMovieExits){
                    realm.write(() => {
                        searchUserExist.like.push({ id: milliseconds, movieId: movieId, status: true })
                        resolve()
                    })
                }
            } else {
                console.log('searchUserExist==null');
                realm.write(() => {
                    let data = realm.create(USER_LIKE_SCHEMA, { userId: userId, like: [] });
                    data.like.push({ id: milliseconds, movieId: movieId, status: true });
                    resolve()
                })
            }
            realm.close();
        }).catch((error) => reject(error))
    })
}


function* fetchListLikeFromLocal(userId) {
    return Realm.open(databaseOptions).then(realm => (realm.objectForPrimaryKey(USER_LIKE_SCHEMA,parseInt(userId) )).like)
}
export const database = {
    likeMovie,
    fetchListLikeFromLocal
}