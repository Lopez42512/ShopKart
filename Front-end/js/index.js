
    
    $(document).ready(function () {

        // ===================  search by category code ======================
        $("#SearchBtn").on("click", function (event) {
            event.preventDefault();

            $("#test_one").empty();

            let category = $("#optionsBtn").val();
            console.log(category);
            // Send the PUT request.
            $.get("/api/category/" + category, function (DB) {

                // Log the data to the console
                // console.log(DB);
                // Call our renderBooks function to add our books to the page
                // renderBooks(data);

                // Loop through and display each job
                for (var i = 0; i < DB.length; i++) {

                    // var itemInfo = {
                    //     name: DB[i].name,
                    //     category: DB[i].category,
                    //     description: DB[i].description,
                    //     price: DB[i].price
                    // }

                
                    let img = new Image();
                   
                    let test = DB[i].image.replace(/\s/g, "+");

                    img.src = test;
                    img.class = img;


                    // Get a reference to the jobList element and populate it with jobs
                    var box = $("<div>");
                        box.addClass(DB[i].id);
                    // var btn = $("<button>Buy it</button>");
                    // var userId = DB[i].id;
                        // btn.addClass(userId);
                        // var br = $("<br />");
                    box.append(
                        $("<p>").text("id"+" "+ DB[i].id),
                        $("<p>").text("Name:" + " " + DB[i].name),
                        $("<p>").text("Category:" + " " + DB[i].category),
                        $("<p>").text("description:" + " " + DB[i].description),
                        $("<p>").text("price:" + " " + DB[i].price),
                            //insert image
                         img,
                        //  br,
                        //  btn,
                         
                          );
                   
                  

                            

                    $("#test_one").prepend(box,);
                 
                }

            });
        
        
            //====================================================================

        });
       


    });
    







