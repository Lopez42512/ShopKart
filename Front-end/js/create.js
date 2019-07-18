function previewFile() {
    var preview = document.querySelector("img"); //selects the query named img
    var file = document.querySelector("input[type=file]").files[0]; //sames as here
    var reader = new FileReader();
  
    reader.onloadend = function() {
      preview.src = reader.result;
    };
  
    if (file) {
      reader.readAsDataURL(file); //reads the data as a URL
    } else {
      preview.src = "";
    }
  }
  
  previewFile(); //calls the function named previewFile()

  var url = window.location.search;
    
     var authorId = url.split("?")[1];
     var authorName = url.split("?")[2];
     console.log(authorId);
     console.log(authorName);

     //==== this will create div with user name on top of the page
     var helloUser = $('<li class="nav-item mt-2 mr-3">Hello'+" "+ authorName + "</li>");
     
     $("#navBar").prepend(helloUser);

     //==============================================

  $("#submit").click(function(event) {
    event.preventDefault();
  
    var imgSrc = $("img").attr("src");
  
    var newItem = {
      userId: authorId,
      name: $("#name").val(),
      description: $("#desc").val(),
      price: $("#price").val(),
      category: $("#cat").val(),
      image: imgSrc
    };
  
    console.log(newItem);
  
    $.post("/api/new", newItem).then(function() {
      console.log("success");
    });
  });
