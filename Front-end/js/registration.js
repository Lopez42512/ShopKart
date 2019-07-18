$("#register").on("click", function(){

    var newUser = {
        email: $('#email').val(),
        password: $('#password').val()
    }
    console.log(newUser);

    $.post("/api/new/user", newUser).then(function() {
         console.log("success");
         document.location.href="/login";

});
})
