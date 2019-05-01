import FormData from 'FormData';

const urlSignUp = 'http://training-movie.bsp.vn:82/user/registry'
var formData = new FormData();

function* signUpFromApi(user) {

    // add data vào form
    formData.append('full_name', user.full_name);
    formData.append('email', user.email);
    formData.append('password', user.password);


    const response = yield fetch(urlSignUp, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            // khai báo content-type với loại multipart/form-data để dùng được FormData
            'Content-Type': "multipart/form-data",
            "app_token": "dCuW7UQMbdvpcBDfzolAOSGFIcAec11a",
        },
        body: formData,
    }).then(value => value.json()).catch((error) => { console.error(error) })
    return response
}

export const Api = {
    signUpFromApi
}



















