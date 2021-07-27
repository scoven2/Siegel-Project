$(document).ready(function () {

    let user = $.get('/api/user_data').then(function (data) {
        console.log('user.email: ', data.email);
        console.log('user.id: ', data.id);
        return data;
    });
});