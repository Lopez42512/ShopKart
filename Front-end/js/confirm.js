$(document).ready(function() {
  $.ajax({
    url: "/last",
    method: "GET"
  }).then(function(DB) {
      console.log(DB)
      $("#test_one").append(DB.price)
  });
});
