$(document).ready(function () {
        
    $.ajax({
            url: "/api/all",
            method: "GET"
        })
            .then(function (DB) {

                // Here we then log the DB to console, where it will show up as an object.
                console.log(DB);
                console.log("------------------------------------");
                // Loop through and display each job
                for (var i = 0; i < DB.length; i++) {

                    // Get a reference to the jobList element and populate it with jobs
                    var box = $("<button>");

                    box.addClass("button");
                    // box.addEventListener("click", "myScript");

                    box.append(
                        $("<p id=name>").text("Name:" + " " + DB[i].name),
                        $("<p>").text("Category:" + " " + DB[i].category),
                        $("<p>").text("description:" + " " + DB[i].description),
                        $("<p>").text("price:" + " " + DB[i].price),
                        // $("<button>").addClass("buy").text("Purchase")

                        
                    );
                    box.innerhtml = "hello world"
                    let img = new Image();
                    // let test = DB[i].image.replace(/\s/g, "+");
                    
                    // img.src = test;
                    // img.class = img;

                    //=========================
                   
                    let testToString = DB[i].image.toString().replace(/\s/g, "+");
                    
                    img.src = testToString;
                    img.class = img;
                    // img.addClass("imgSize");
                    // .replace(/\s/g, "+");

                    //=========================

                    $("#test_one").append(box,img);
                }
                $(".button").click(function(event){
                    event.preventDefault();
                    var name = event.currentTarget;
                    // console.log(name.innerHTML);
                    // console.log(name.innerHTML.split('Name: ').pop().split('<'))
                    // console.log(name.innerHTML.split('Category: ').pop().split('<'))
                    // console.log(name.innerHTML.split('description: ').pop().split('<'))
                    // console.log(name.innerHTML.split('price: ').pop().split('<'))
                    var paypalObj = {
                        name: name.innerHTML.split('Name: ').pop().split('<')[0],
                        category: name.innerHTML.split('Category: ').pop().split('<')[0],
                        description: name.innerHTML.split('description: ').pop().split('<')[0],
                        price: name.innerHTML.split('price: ').pop().split('<')[0]
                    };
                    console.log(paypalObj)
                    $.post("/paypalInfo", paypalObj).then(function() {
                        console.log("success");
                        document.location.href="/paypal";

                });
                })
            });
    
    
    // ===================  search by category code ======================
    $("#SearchBtn").on("click", function (event) {
        event.preventDefault();

        $("#test_one").empty();

        let category = $("#optionsBtn").val();
        console.log(category);
        // Send the PUT request.
        $.get("/api/category/" + category, function (DB) {

            // Log the data to the console
            console.log(DB);
            // Call our renderBooks function to add our books to the page
            // renderBooks(data);

            // Loop through and display each job
            for (var i = 0; i < DB.length; i++) {

                // Get a reference to the jobList element and populate it with jobs
                var box = $("<button>");

                box.addClass("button");
                // box.addEventListener("click", "myScript");

                box.append(
                    $("<p id=name>").text("Name:" + " " + DB[i].name),
                    $("<p>").text("Category:" + " " + DB[i].category),
                    $("<p>").text("description:" + " " + DB[i].description),
                    $("<p>").text("price:" + " " + DB[i].price),
                    // $("<button>").addClass("buy").text("Purchase")

                    
                );
                box.innerhtml = "hello world"
                let img = new Image();
                // let test = DB[i].image.replace(/\s/g, "+");

                // img.src = test;
                // img.class = img;

                //=========================

                let testToString = DB[i].image.toString().replace(/\s/g, "+");

                img.src = testToString;
                img.class = img;
                // .replace(/\s/g, "+");

                //=========================

                $("#test_one").append(box,img);
            }
            $(".button").click(function(event){
                event.preventDefault();
                var name = event.currentTarget;
                // var arr = [name]
                // console.log(name.innerHTML);
                // console.log(name.innerHTML.split('Name: ').pop().split('<'))
                // console.log(name.innerHTML.split('Category: ').pop().split('<')[0])
                // console.log(name.innerHTML.split('description: ').pop().split('<')[0])
                // console.log(name.innerHTML.split('price: ').pop().split('<')[0])
                var paypalObj = {
                    name: name.innerHTML.split('Name: ').pop().split('<')[0],
                    category: name.innerHTML.split('Category: ').pop().split('<')[0],
                    description: name.innerHTML.split('description: ').pop().split('<')[0],
                    price: name.innerHTML.split('price: ').pop().split('<')[0]
                };
                console.log(paypalObj)

            })

        });


        //====================================================================

        // console.log("hello world");


        






    });

});
