const urlListFilm = "http://training-movie.bsp.vn:82/movie/list";

function* listFilmFromApi(page) {
    const response = yield fetch(`${urlListFilm}?page=${page}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "app_token": "dCuW7UQMbdvpcBDfzolAOSGFIcAec11a",
        },
    }).then(value => value.json())
    return response
}

export const Api = {
    listFilmFromApi,
}
