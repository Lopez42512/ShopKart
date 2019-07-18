$(document).ready(function() {
  $.ajax({
    url: "/api/paypal",
    method: "GET"
  }).then(function(DB) {
    console.log(DB);
    $("#name").val(DB.name)
    $("#desc").val(DB.desc);
    $("#price").val(DB.price);
    // $("#name").append(DB.name);
    $("#cat").val(DB.cat);
    console.log($("#button"))
    var itemObj = {
      name: DB.name,
      price: DB.price,
      desc: DB.desc,
      cat: DB.cat
    };

    console.log(itemObj)

    // $("button").click(function() {
    //   $.post("/success", DB
    //   ).then(function() {
    //     console.log(DB);
    //     // document.location.href="https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-85W915805D306792N#/checkout/review";

    //   });
    // });
  });
});
