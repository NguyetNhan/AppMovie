import FormData from 'FormData';

const urlForget = 'http://training-movie.bsp.vn:82/user/forgot-password'
var formData = new FormData();

function* forgetPasswordFromApi(email){

       // add data vào form
       formData.append('email', email);

    const response = yield fetch(urlForget, {
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
    forgetPasswordFromApi
}














