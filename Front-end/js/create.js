<<<<<<< HEAD

var url = window.location.search;
     console.log(url);
     var authorId = url.split("?")[1];
     console.log(authorId);

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

$("#submit").click(function(event) {
  event.preventDefault();

  var imgSrc = $("img").attr("src");
  var one = 1;

  var newItem = {
    UserId: authorId,
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
=======
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
  
  $("#submit").click(function(event) {
    event.preventDefault();
  
    var imgSrc = $("img").attr("src");
  
    var newItem = {
      userId: "1",
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
>>>>>>> 54fe810d54a1ab2bceaada03da8b97af76b6ab1c
