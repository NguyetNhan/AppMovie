/* eslint-disable no-console */
/* eslint-disable indent */
const urlListFilm = 'http://training-movie.bsp.vn:82/movie/list';
const urlLogout = 'http://training-movie.bsp.vn:82/user/logout';

function* listFilmFromApi (page) {
        //  console.log('page: ', page);
        const response = yield fetch(`${urlListFilm}?page=${page}`, {
                method: 'GET',
                headers: {
                        'Content-Type': 'application/json',
                        'app_token': 'dCuW7UQMbdvpcBDfzolAOSGFIcAec11a',
                },
        }).then(value => value.json());
        //    console.log('response: ', response.data);
        return response;
}

function* logoutFromApi (value) {
        const response = yield fetch(urlLogout, {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json',
                        'app_token': 'dCuW7UQMbdvpcBDfzolAOSGFIcAec11a',
                        'access_token': value
                },
        }).then(value => value.json());
        return response;
}

export const Api = {
        listFilmFromApi, logoutFromApi
};
