$(document).ready(function () {
var loginLink = $("#linkToLoginPage");
    loginLink.hide();

    $("#register").on("click", function () {

        var newUser = {
            email: $('#email').val(),
            password: $('#password').val()
        }
        console.log(newUser);

        $.post("/api/new/user", newUser).then(function (res) {

            console.log("success");
            console.log(res);
       

        // hide login inputs
        var loginStuff = $("#loginInfo");
        loginStuff.hide();

        // creates new div with a message 
        var message = res.message;

        var newMessage = $("<h3>"+ message +"</h3>");

        $("#newMessage").append(newMessage);
        loginLink.show();
    });  

    })

});
