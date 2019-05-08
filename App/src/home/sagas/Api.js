const urlListFilm = "http://training-movie.bsp.vn:82/movie/list";

function* listFilmFromApi(page) {
    const response = yield fetch(`${urlListFilm}?page=${page}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "app_token": "dCuW7UQMbdvpcBDfzolAOSGFIcAec11a",
        },
    }).then(value => value.json())
    console.log('response: ', response.data);
    for (i = 0; i < response.data.length; i++) {
        response.data[i].liked = false
        response.data[i].urlImageLike = require('../../../assets/images/ic_like.png')
        response.data[i].textButtonLike = 'Thích'
        response.data[i].colorTextLike = "white"
    }
    return response
}

export const Api = {
    listFilmFromApi,
}
