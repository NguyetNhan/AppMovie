const urlSignIn = "http://training-movie.bsp.vn:82/user/login";

function* signInFromApi(user) {
    const response = yield fetch(`${urlSignIn}?email=${user.email}&password=${user.password}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "app_token": "dCuW7UQMbdvpcBDfzolAOSGFIcAec11a",
        },
    }).then(value => value.json())
    return response
}

export const Api = {
    signInFromApi,
}