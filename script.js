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
            let output = "<h5 class=\"card-title\">";
            for (let element of result) {
                output += "<h5 class=\"card-title\">" + element.title + "</h5><p class=\"card-text\">" + element['Job Summary'] + "</p><button class=\"btn btn-primary\" data-id='" + element.id + "' id=\"readMore\">Read More</button><hr>";
                console.log(element.title)
            }
            dataList.html(output)
          }
      })
    // console.log(data)
});

$(document).on('click', '#readMore', function(){
    let jobId = $(this).attr('data-id');
    let url = "http://localhost:3000/jobs/" + jobId
    let homeButton = $("#homeButton")
    let changedHome = "<a class=\"nav-link\" href=\"./index.html\">Home <span class=\"sr-only\">(current)</span></a>"
    homeButton.html(changedHome)
    let title = $("#page-title")
    let changedTitle = "<a href=\"./index.html\" class=\"btn btn-primary\"> Back to home </a>"
    title.html(changedTitle)
    $.getJSON(url, function(data){
        let dataList = $("#job-listings")
        let output = "<h5 class=\"card-title\">";
        output += "<h5 class=\"card-title\">" + data.title + "</h5><h6 class=\"card-title\"> Company: " + data.company + "</h6><h6 class=\"card-title\"> Department: " + data.department + "</h6><h6 class=\"card-title\"> Location: " + data.location + "</h6><h6 class=\"card-title\"> Type: " + data.type + "</h6><h6 class=\"card-title\"> Industry: " + data.industry + "</h6><h6 class=\"card-title\"> Salary: " + data.salary + "</h6><h6 class=\"card-title\"> Mininmum Qualification: " + data["Minimum Qualification"] + "</h6><h6 class=\"card-title\"> Experience Level: " + data["Experience Level"] + "</h6><h6 class=\"card-title\"> Experience Length: " + data["Experience Length"] + "</h6><p class=\"card-text\"> <b>Job Summary</b>: <br/>" + data['Job Summary'] + "<hr>"
        dataList.html(output)
    })
});