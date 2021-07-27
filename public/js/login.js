$(document).ready(function () {
    $('ul').hide();

    let loginForm = $('form.login');
    let emailInput = $('input#email-input');
    let passwordInput = $('input#password-input');


    loginForm.on('submit', function (event) {
        console.log('on click');
        event.preventDefault();
        
        let userData = {
            email: emailInput.val().trim(),
            password: passwordInput.val().trim()
        };
        
        if (!userData.email || !userData.password) {
            return;
        }

        loginUser(userData.email, userData.password);
        emailInput.val('');
        passwordInput.val('');
    });


    function loginUser(email, password) {
        $.post('/api/login', {
            email: email,
            password: password  
        })
        .then(function() {
            window.location.replace('/home');
        })
        .catch(function(err) {
            console.log(err);
        });
    }
});