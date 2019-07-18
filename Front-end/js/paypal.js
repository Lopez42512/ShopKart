$(document).ready(function() {
  $.ajax({
    url: "/api/paypal",
    method: "GET"
  }).then(function(DB) {
    console.log(DB);
    $("#desc").append(DB.desc);
    $("#price").append(DB.price);
    $("#name").append(DB.name);
    $("#cat").append(DB.cat);

    var itemObj = {
      name: DB.name,
      price: DB.price,
      desc: DB.desc,
      cat: DB.cat
    };

    console.log(itemObj)

    $("#button").click(function() {
      $.post("/pay", DB[0]
      ).then(function() {
        console.log(DB);
      });
    });
  });
});
