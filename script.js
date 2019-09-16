console.log("This is working")
$(document).ready(function(){
    let dataList = $("#job-listings")
    // let data = $.get("http://localhost:3000/jobs", function(data, status){
    //     // alert("Data: " + data + "\nStatus: " + status);
    //   });
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/jobs",
        success: function(result){
            console.log(result);
            let output = "";
            for (let element of result) {
                console.log(element.title)
            }
          }
      })
    // console.log(data)
});