$(document).ready(function () {

$("#loginBtn").on("click", function (event) {
    event.preventDefault();

    var userLogin = {
        username: $("#username").val(),
        password: $("#password").val()
    };

    console.log(userLogin);

    // $.get("/api/usernameAndPassword", userLogin).then(function (res) {
    //         console.log(res);

    // });
    // "/api/username:nAndPassword:p"

    $.ajax({
        url: "/api/username" + userLogin.username + "/Password" + userLogin.password,
        method: "GET"
    })
        // After the data from the AJAX request comes back
        .then(function (res) {
            console.log(res)
            if (res === null) {
                var warningMessage = $("<h6>Oops, username or password are incorrect, try again...</h6>");
                $("#wm").append(warningMessage);

            } else if (res !== null) {
              console.log(res)
              loggedInUser (res)
              // redirect to homepage
                // location.assign("/");
            }
        });

});

function loggedInUser (id){
    // redirect to homepage
    location.assign("/create?"+id);
    
}

})